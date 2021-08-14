<script>
  import Loader from './Loader.svelte';
  export let bgColor = "bg-green-700"
  export let bgHoverColor = "bg-green-600"
  export let size = "medium";
  export let className = "";
  export let isLoading = false;

  const getPaddingSize = (size) => {
    switch (size) {
      case "small":
        return "py-1 px-4"
      default:
        return "py-2 px-8"
    }
  }

  const getTextSize = (size) => {
    switch (size) {
      case "small":
        return "text-sm"
      default:
        return "text-lg"
    }
  }

  const getLoaderSize = (size) => {
    switch (size) {
      case "small":
        return "20"
      default:
        return "40"
    }
  }
  let padding = getPaddingSize(size);
  let text = getTextSize(size);
  let loaderSize = getLoaderSize(size);
  
</script>

<button
  disabled={isLoading}
  on:click
  class={`flex align-center justify-center text-white ${bgColor} border-0 ${padding} focus:outline-none hover:${bgHoverColor} rounded ${text} ${className}`}>
  {#if isLoading}
    <div class="relative">
      <div class="invisible"><slot /></div>
      <div class="loader-container">
        <Loader size={loaderSize}/>
      </div>
    </div>
  {:else}
    <slot />
  {/if}
</button>

<style>
  .loader-container {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    height: fit-content;
  }
</style>