<script>
  export let label
  export let value
  export let error
</script>

<div class="relative mb-4">
  <label for={label} class={`leading-7 text-sm ${error ? 'text-red-600' :' text-gray-600'}`}>{label}</label>
  <input bind:value id={label} name={label} {...$$restProps}
      class={`w-full bg-white rounded border  ${error ? 'border-red-300' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}>
</div>
