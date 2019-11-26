<template>
    <div class="container">
        <div class="header1">
            <div>
               <el-page-header @back="back" >
                 </el-page-header>
            </div>
            <div>
               <img src="http://image72.360doc.com/DownloadImg/2014/05/2621/42059335_1.jpg"/>
            </div>
            <div>
              <el-input v-model="text" @keyup.enter.native="submit" >
                   <el-button slot="append" icon="el-icon-search" @click="submit" ></el-button>
              </el-input>
            </div>
        </div>
        <div class="main">
            <p v-show="show">找到约{{count}}条结果(用时约{{spendTime}}秒)</P>
            <ul>
                <li v-for="list in lists" :key="list.title">
                    <h4 v-html="list.title">
                    </h4>
                    <p>
                        <router-link :to="'http://www.qz-hotpot.xyz:8081'+list.url" target="_blank">
                          http://www.qz-hotpot.xyz:8081{{list.url}}
                        </router-link>
                        </p>
                    <p v-html="list.content">
                    </P>
                    <p><span v-for="tag in list.tags">-{{tag}}-</span></P>
                </li>
            </ul>
        </div>
    </div>
</template>

<style  scoped>

.header1{
    width:100%;
    height:100px;
  border-bottom:2px solid rgb(247,247,247);
    display: flex;
}
.header1>div:nth-of-type(1){
    flex:1;
    padding-left:30px;
    box-sizing: border-box;
}
.header1>div:nth-of-type(1)>p{
    margin:0px;
    font-size:54px;
    cursor: pointer;
    color:orange;
}
.header1>div:nth-of-type(2){
    flex:2;
    margin-right:20px;
    box-sizing: border-box;
}
.header1>div:nth-of-type(2) img{
   width:80%;
   height:80%;
}
.header1>div:nth-of-type(3){
    flex:6;
    padding-top:10px;
    box-sizing: border-box;
    margin-right:20%;
}
.main{
    width:60%;
    margin-left:20%;
}
.main>p{
    font-family:cursive;
    margin-left:40px;
}
.main>ul>li{
  list-style: none;
}
.main>ul>li>p:nth-of-type(1){
    color:green;
}
.shadow{
    width:80%;
   min-height:50px;
}
.main>ul>li>p:nth-of-type(3){
    width:100%;
    height:50px; 
}
a{
   list-style: none;
}
.el-page-header{
    margin-top:10%;
    font-size:36px;
}
</style>


<script>
import axios from 'axios';
import $ from "jquery";
export default {
    data(){
        return{
           text:"",
           lists:{},
           count:0,
           spendTime:"",
           show:false
        }
    },
    methods:{
        back(){
           this.$router.push('/index');
        },
        submit(){
            if(this.text==""){
                alert("请输入你要搜索的内容")
            }else{
               axios.get("http://www.qz-hotpot.xyz:8081/blog/articles/search",{
                   params:{
                       "text":this.text
                   }
               }).then((res)=>{
                   this.show=true;
                   this.count=res.data.count;
                   this.spendTime=res.data.spendTime;
                   this.lists=res.data.data;
                   console.log(this.lists);
               }).catch((err)=>{
                   alert(err);
                   return
               })
            }
        }
    }
}
</script>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    </div>
</template>