<script>
  export let bgColor = "bg-green-700"
  export let bgHoverColor = "bg-green-600"
  export let size = "medium";
  export let className = "";
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
  let padding = getPaddingSize(size);
  let text = getTextSize(size);

  
</script>

<button on:click class={`text-white ${bgColor} border-0 ${padding} focus:outline-none hover:${bgHoverColor} rounded ${text} ${className}`}>
  <slot />
</button>