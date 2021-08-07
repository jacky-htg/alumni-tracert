<script>
  import { fromEvent } from "file-selector";
  import {
    allFilesAccepted,
    composeEventHandlers,
    fileAccepted,
    fileMatchSize,
    isEvtWithFiles,
    isIeOrEdge,
    isPropagationStopped,
    onDocumentDragOver,
    TOO_MANY_FILES_REJECTION
  } from "../helper/upload";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import BarLoader from './BarLoader.svelte';
  //props
  /**
   * Set accepted file types.
   * See https://github.com/okonet/attr-accept for more information.
   */
  export let accept; // string or string[]
  export let disabled = false;
  export let getFilesFromEvent = fromEvent;
  export let maxSize = Infinity;
  export let minSize = 0;
  export let multiple = true;
  export let preventDropOnDocument = true;
  export let noClick = false;
  export let noKeyboard = false;
  export let noDrag = false;
  export let noDragEventsBubbling = false;
  export let containerClasses = "";
  export let containerStyles = "";
  export let disableDefaultStyles = false;
  export let isLoading = false;
  export let name="";
  const dispatch = createEventDispatcher();
  //state
  let state = {
    isFocused: false,
    isFileDialogActive: false,
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
    draggedFiles: [],
    acceptedFiles: [],
    fileRejections: []
  };
  let rootRef;
  let inputRef;
  function resetState() {
    state.isFileDialogActive = false;
    state.isDragActive = false;
    state.draggedFiles = [];
    state.acceptedFiles = [];
    state.fileRejections = [];
  }
  // Fn for opening the file dialog programmatically
  function openFileDialog() {
    if (inputRef) {
      inputRef.value = null; // TODO check if null needs to be set
      state.isFileDialogActive = true;
      inputRef.click();
    }
  }
  // Cb to open the file dialog when SPACE/ENTER occurs on the dropzone
  function onKeyDownCb(event) {
    // Ignore keyboard events bubbling up the DOM tree
    if (!rootRef || !rootRef.isEqualNode(event.target)) {
      return;
    }
    if (event.keyCode === 32 || event.keyCode === 13) {
      event.preventDefault();
      openFileDialog();
    }
  }
  // Update focus state for the dropzone
  function onFocusCb() {
    state.isFocused = true;
  }
  function onBlurCb() {
    state.isFocused = false;
  }
  // Cb to open the file dialog when click occurs on the dropzone
  function onClickCb() {
    if (noClick) {
      return;
    }
    // In IE11/Edge the file-browser dialog is blocking, therefore, use setTimeout()
    // to ensure React can handle state changes
    // See: https://github.com/react-dropzone/react-dropzone/issues/450
    if (isIeOrEdge()) {
      setTimeout(openFileDialog, 0);
    } else {
      openFileDialog();
    }
  }
  function onDragEnterCb(event) {
    event.preventDefault();
    stopPropagation(event);
    dragTargetsRef = [...dragTargetsRef, event.target];
    if (isEvtWithFiles(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(draggedFiles => {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }
        state.draggedFiles = draggedFiles;
        state.isDragActive = true;
        dispatch("dragenter", {
          dragEvent: event
        });
      });
    }
  }
  function onDragOverCb(event) {
    event.preventDefault();
    stopPropagation(event);
    if (event.dataTransfer) {
      try {
        event.dataTransfer.dropEffect = "copy";
      } catch {} /* eslint-disable-line no-empty */
    }
    if (isEvtWithFiles(event)) {
      dispatch("dragover", {
        dragEvent: event
      });
    }
    return false;
  }
  function onDragLeaveCb(event) {
    event.preventDefault();
    stopPropagation(event);
    // Only deactivate once the dropzone and all children have been left
    const targets = dragTargetsRef.filter(
      target => rootRef && rootRef.contains(target)
    );
    // Make sure to remove a target present multiple times only once
    // (Firefox may fire dragenter/dragleave multiple times on the same element)
    const targetIdx = targets.indexOf(event.target);
    if (targetIdx !== -1) {
      targets.splice(targetIdx, 1);
    }
    dragTargetsRef = targets;
    if (targets.length > 0) {
      return;
    }
    state.isDragActive = false;
    state.draggedFiles = [];
    if (isEvtWithFiles(event)) {
      dispatch("dragleave", {
        dragEvent: event
      });
    }
  }
  function onDropCb(event) {
    event.preventDefault();
    stopPropagation(event);
    dragTargetsRef = [];
    if (isEvtWithFiles(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(files => {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }
        const acceptedFiles = [];
        const fileRejections = [];
        files.forEach(file => {
          const [accepted, acceptError] = fileAccepted(file, accept);
          const [sizeMatch, sizeError] = fileMatchSize(file, minSize, maxSize);
          if (accepted && sizeMatch) {
            acceptedFiles.push(file);
          } else {
            const errors = [acceptError, sizeError].filter(e => e);
            fileRejections.push({ file, errors });
          }
        });
        if (!multiple && acceptedFiles.length > 1) {
          // Reject everything and empty accepted files
          acceptedFiles.forEach(file => {
            fileRejections.push({ file, errors: [TOO_MANY_FILES_REJECTION] });
          });
          acceptedFiles.splice(0);
        }
        state.acceptedFiles = acceptedFiles;
        state.fileRejections = fileRejections;
        dispatch("drop", {
          acceptedFiles,
          fileRejections,
          event,
          name
        });
        if (fileRejections.length > 0) {
          dispatch("droprejected", {
            fileRejections,
            event
          });
        }
        if (acceptedFiles.length > 0) {
          dispatch("dropaccepted", {
            acceptedFiles,
            event
          });
        }
      });
    }
    resetState();
  }
  function composeHandler(fn) {
    return disabled ? null : fn;
  }
  function composeKeyboardHandler(fn) {
    return noKeyboard ? null : composeHandler(fn);
  }
  function composeDragHandler(fn) {
    return noDrag ? null : composeHandler(fn);
  }
  function stopPropagation(event) {
    if (noDragEventsBubbling) {
      event.stopPropagation();
    }
  }
  let dragTargetsRef = [];
  function onDocumentDrop(event) {
    if (rootRef && rootRef.contains(event.target)) {
      // If we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
      return;
    }
    event.preventDefault();
    dragTargetsRef = [];
  }
  // Update file dialog active state when the window is focused on
  function onWindowFocus() {
    // Execute the timeout only if the file dialog is opened in the browser
    if (state.isFileDialogActive) {
      setTimeout(() => {
        if (inputRef) {
          const { files } = inputRef;
          if (!files.length) {
            state.isFileDialogActive = false;
            dispatch("filedialogcancel");
          }
        }
      }, 300);
    }
  }
  onMount(() => {
    window.addEventListener("focus", onWindowFocus, false);
    if (preventDropOnDocument) {
      document.addEventListener("dragover", onDocumentDragOver, false);
      document.addEventListener("drop", onDocumentDrop, false);
    }
  });
  onDestroy(() => {
    window.removeEventListener("focus", onWindowFocus, false);
    if (preventDropOnDocument) {
      document.removeEventListener("dragover", onDocumentDragOver);
      document.removeEventListener("drop", onDocumentDrop);
    }
  });
  function onInputElementClick(event) {
    event.stopPropagation();
  }
</script>

<div
  class="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md"
  bind:this={rootRef}
  tabindex="0"
  style={containerStyles}
  on:keydown={composeKeyboardHandler(onKeyDownCb)}
  on:focus={composeKeyboardHandler(onFocusCb)}
  on:blur={composeKeyboardHandler(onBlurCb)}
  on:click={composeHandler(onClickCb)}
  on:dragenter={composeDragHandler(onDragEnterCb)}
  on:dragover={composeDragHandler(onDragOverCb)}
  on:dragleave={composeDragHandler(onDragLeaveCb)}
  on:drop={composeDragHandler(onDropCb)}>
  <input
    {accept}
    {multiple}
    type="file"
    autocomplete="off"
    tabindex="-1"
    on:change={onDropCb}
    on:click={onInputElementClick}
    bind:this={inputRef}
    style="display: none;" />
  <slot>
    {#if isLoading}
      <BarLoader size="80" color="rgb(4, 120, 87)" unit="px" duration="3s" />
    {:else}
      <div class="space-y-1 text-center">
        <svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="flex text-sm text-gray-600">
          <label for="file-upload" class="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              class="sr-only"
              {accept}
              {multiple}
              autocomplete="off"
              tabindex="-1"
              on:change={onDropCb}
              on:click={onInputElementClick}
              bind:this={inputRef}
              style="display: none;"
            >
          </label>
          <p class="pl-1">or drag and drop</p>
        </div>
        <p class="text-xs text-gray-500">
          PDF, PNG, JPG up to 10MB
        </p>
      </div>
    {/if}
  </slot>
</div>