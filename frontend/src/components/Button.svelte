<script>
  export let bgColor = "bg-green-700"
  export let bgHoverColor = "bg-green-600"
</script>

<button on:click class={`text-white ${bgColor} border-0 py-2 px-8 focus:outline-none hover:${bgHoverColor} rounded text-lg`}>
  <slot />
</button>