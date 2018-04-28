<template>
  <span>{{ $n(value/100, 'currency', 'EUR') }}</span>
</template>
<script>
export default {
  props: ["value"],
}
</script>
