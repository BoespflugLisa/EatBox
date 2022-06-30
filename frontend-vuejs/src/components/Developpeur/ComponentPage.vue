<template>
    <div id="components-page">

    </div>



</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {
    },
})

export default class ComponentPage extends Vue{
    name = "ComponentPage"
    role = this.$cookies.get('role');
}
</script>

<style scoped>

</style>