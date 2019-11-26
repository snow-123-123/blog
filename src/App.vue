<template>
   <div>
      <Header  v-if="headshow"></Header>
      <router-view ></router-view>
   </div>
</template>

<script>
import Header from "./components/Header"
export default {
  data(){
    return{
      headshow:true
    }
  },
  name: 'App',
  components:{
    Header
  },
  watch:{
   $route (to,from) { 
     if(to.path=="/search"){
       this.headshow=false;
     }else{
        this.headshow=true;
     }
    }
  },
  created(){
    if(this.$route.path=="/search"){
       this.headshow=false;
     }else{
        this.headshow=true;
     }
    }
  
}
</script>

<style>

</style>
