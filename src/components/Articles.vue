<template>
    <div class="container">
      <div class="d1">
          <mavon-editor :value="lists.content" :defaultOpen = "'preview'" :subfield = "false"
                        :toolbarsFlag = "false" :editable="false" :scrollStyle="true" :ishljs = "true">
         </mavon-editor>
      </div>
      <Comment></Comment>
    </div>
</template>

<script>
import axios from 'axios';
import Comment from './Comment';
export default {
    data(){
        return{
            markdownOption:{
                bold:true
            },
            lists:[]
        }
    },
    methods:{
        getData(){
            localStorage.setItem("path",this.$route.params.code);
             axios.get(`http://www.qz-hotpot.xyz:8081/blog/articles/${this.$route.params.code}`).then((res)=>{
                 if(res.status==200){
                    this.lists=res.data;
                 }else if(res.status==404){
                     alert("404 NOT FOUND")
                 }
             }).catch((err)=>{
                 alert(err.response.data);
                 return
             }) 
        }
    },
    mounted(){
        this.getData();
    },
    components:{
        Comment
    }
}
</script>

<style scoped>
.container{
    border-top: 2px solid rgb(247,247,247);
    width:100%;
    margin-top:2px;   
}
@media (max-width: 767px){
     .d1{
    width:100%;
    margin-top:10px;
    }
}
 @media (min-width:767px){
    .d1{
    width:50%;
    margin-left:25%;
    margin-top:10px;
    }
}


</style>
