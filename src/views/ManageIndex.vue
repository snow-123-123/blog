<template>
    <div>
        <Manage></Manage>
        <router-view></router-view>
      
    </div>
</template>

<script>
import Manage from './Manage'
export default {
    components:{
        Manage
    }
}
</script>