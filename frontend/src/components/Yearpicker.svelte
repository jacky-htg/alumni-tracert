<script>
  import Popover from './Popover.svelte';
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const today = new Date();
  const keyCodes = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    pgup: 33,
    pgdown: 34,
    enter: 13,
    escape: 27,
    tab: 9
  };
  const keyCodesArray = Object.keys(keyCodes).map(k => keyCodes[k]);
  
  let popover;

  export let trigger = null;
  
  let yearSelected = today.getFullYear();
  let highlighted = today.getFullYear();
  let minYear = (Math.floor(today.getFullYear()/10) * 10) - 10;
  let maxYear = (Math.ceil(today.getFullYear()/10) * 10) -1;
  let isOpen = false;
  let isClosing = false;

  let years = [];

  const changeYears = () => {
    years = [];
    for (var i=minYear; i <= maxYear; i++) {
      years.push(i);
    }
  } 

  onMount(() => {
    changeYears();
  });

  function assignmentHandler(formatted) {
    if (!trigger) return;
    trigger.innerHTML = formatted;
  }

  function registerSelection(chosen) {
    close();
    return dispatch('yearSelected', chosen);
  }

  function handleKeyPress(evt) {
    if (keyCodesArray.indexOf(evt.keyCode) === -1) return;
    evt.preventDefault();
    switch (evt.keyCode) {
      case keyCodes.left:
        incrementDayHighlighted(-1);
        break;
      case keyCodes.up:
        incrementDayHighlighted(-5);
        break;
      case keyCodes.right:
        incrementDayHighlighted(1);
        break;
      case keyCodes.down:
        incrementDayHighlighted(5);
        break;
      case keyCodes.pgup:
        incrementMonth(-1);
        break;
      case keyCodes.pgdown:
        incrementMonth(1);
        break;
      case keyCodes.escape:
        // eslint-disable-next-line
        close();
        break;
      case keyCodes.enter:
        registerSelection(highlighted);
        break;
      default:
        break;
    }
  }

  function registerClose() {
    document.removeEventListener('keydown', handleKeyPress);
    dispatch('close');
  }

  function close() {
    popover.close();
    registerClose();
  }

  function registerOpen() {
    document.addEventListener('keydown', handleKeyPress);
    dispatch('open');
  }

  const selectYear = (e) => {
    yearSelected = e.currentTarget.innerHTML
    close()
  }

  const changeYearGroup = (n) => {
    minYear = minYear + n;
    maxYear = maxYear + n;
    changeYears();
  }
</script>

<div
  class="datepicker"
  class:open="{isOpen}"
  class:closing="{isClosing}"
>
  <Popover
    bind:this="{popover}"
    bind:open="{isOpen}"
    bind:shrink="{isClosing}"
    {trigger}
    on:opened="{registerOpen}"
    on:closed="{registerClose}"
  >
  
    <div slot="trigger">
      <slot {yearSelected}>
        {#if !trigger}
        <input type="text" value="{yearSelected}"/>
        {/if}
      </slot>
    </div>
    <div slot="contents">
      <div class="calendar">
        <div><span on:click="{() => {changeYearGroup(-20)}}">&lt;</span>{minYear} - {maxYear} <span on:click="{() => {changeYearGroup(20)}}">&gt;</span></div>
        <div>
          {#each years as year }
          <div><button on:click="{selectYear}">{year}</button></div>
          {/each}
        </div>
      </div>
    </div>
  </Popover>
</div>

<style>
  .datepicker {
    display: inline-block;
    margin: 0 auto;
    text-align: center;
    overflow: visible;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  .calendar {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    user-select: none;
    width: 100vw;
    padding: 10px;
    padding-top: 0;
  }

  button {
    display:inline-block;
  }

  @media (min-width: 480px) {
    .calendar {
      height: auto;
      width: 340px;
      max-width: 100%;
    }
  }
</style>
