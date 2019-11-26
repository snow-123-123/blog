
<template>
    <div class="container">
        <div class="first" v-if="lists[0]">
              <div>
                    <img :src="lists[0].imgUrl">
                   </div>
                   <div>
                      <h5>
                        <router-link :to="'/articles/'+lists[0].code">
                                 {{lists[0].title}}
                        </router-link>
                      </h5>
                   </div>
        </div>
      <el-row>
          <div class="show">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8"  v-for="list in  dataShow" :key="list.code" class="content ">
                        <div>
                            <div>
                              <img :src="list.imgUrl">
                            </div>
                           <h5>
                               <router-link :to="'/articles/'+list.code">
                                   {{list.title}}
                               </router-link>
                            </h5>
                        </div>
                       
                </el-col>
               
            </div>
      </el-row>
       <div class="page">
                        <ul>
                            <li>
                                <el-button  v-on:click="prePage"><</el-button>
                            </li>
                            <li v-for="(item, index) in totalPage">
                                <el-button v-on:click="toPage(index)" :class="{active: currentpage==index}">{{ index+1 }}</el-button>
                            </li>
                            <li>
                                <el-button v-on:click="nextPage">></el-button>
                            </li>
                        </ul>
                    </div>
    </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
export default {
    data(){
        return{
          //总数据
           totalPage:[],
          lists:[],
          // 总页数
        pageNum:1,
        // 每页显示的个数
        pageSize:6,
        // 当前页
        currentpage:0,
        // 当前显示的数据
        dataShow:[]
        }
    },
    methods:{
        nextPage: function(){
            var vm = this;
            if (vm.currentpage == vm.pageNum - 1) return;
            vm.dataShow = vm.totalPage[++vm.currentpage]   
        },
        prePage: function(){
            var vm = this;
            if (vm. currentpage == 0) return;
            vm.dataShow = vm.totalPage[--vm.currentpage]
        },
        toPage: function(page){
            var vm = this;
            vm.currentpage = page
            vm.dataShow = vm.totalPage[vm.currentpage];
        },
       getData(){
            axios.get(`http://www.qz-hotpot.xyz:8081/blog/articles?currentPage=${this.pageNum}&pageSize=1000`).then((res)=>{
               if(res.status==200) {
                    var vm = this;
                    vm.lists=res.data.records; 
                   //总页数
                 vm.pageNum=Math.ceil( res.data.total/ vm.pageSize) || 1;
                  // 分组
                    for (var i = 0; i<this.pageNum; i++) {
                        vm.totalPage[i] =vm.lists.slice(vm.pageSize * i, vm.pageSize * (i + 1))
                    }
                    // 取值
                vm.dataShow =vm.totalPage[vm.currentpage];
              }else if(res.status==404){
                  alert(404);
              }
          
            }).catch((err)=>{
                alert(err.response.data);
                 return
             })
       },
      
    },
  mounted(){
          this.getData();
    }
}
</script>

<style scoped>
.container{
    background-color: rgb(247,247,247);
    box-sizing: border-box;
    margin:5px;
    padding-top:20px;
}
.content img:hover{
   transform: scale(1.4);
} 
a{
    text-decoration: none;
    color:black;
}
a:hover{
    text-decoration: underline;
    color:orange;
}

 @media (max-width: 767px){
    .show{
      width:100%;
      height:200px;
  }
  .content{
     
      height:100%;
      width:90%;
      margin-left:5%;
      margin-top:10px;
  }
  .content>div{
      background-color: white;
      width:100%;
      height:100%;
  }
  .content>div>div{
        height:80%;
          overflow: hidden;
    }
  .content img{
      cursor: pointer;
	  transition: all 0.6s;
      width:100%;
      height:100%;
  }
  .content>div>h5{
      text-align: center;
      margin-top:3%;
  }
  .first{
        position: relative;
      margin-left:5%;
      width:90%;
      height:200px;
      box-sizing: border-box;
    }
    .first>div:nth-of-type(1){
        display: inline-block;
        width:65%;
        height:100%;
    }
    .first>div img{
        width:100%;
        height:100%;
    }
    .first>div:nth-of-type(2){
        display: inline-block;
       width:35%;
       background-color: white;
       position: absolute;
       top:0px;
       height:100%; 
    }
    .first>div>h5{
        height:100%;
       margin-left: 10%;
    }
    .page{
        margin-top:20px;
        width:80%;
        height:80px;
       margin:0 auto;
    }
    .page>ul{
        width:100%;
        height:100%;
    }
    .page>ul>li{
       list-style:none;
       display: inline-block;
    }
  }
@media screen and (min-width: 767px) and (max-width: 992px) {
     .show{
       margin-left:5%;
      width:90%;
      height:200px;
  }
  .content{
      height:100%;
      width:45.5%;
      margin-left:3%;
      margin-top:20px;
      box-sizing:border-box;
      
  }
  .content>div{
      background-color: white;
      width:100%;
      height:100%;
  }
  .content>div>div{
        height:80%;
          overflow: hidden;
    }
  .content img{
      cursor: pointer;
	  transition: all 0.6s;
      width:100%;
      height:100%;
  }
  .content>div>h5{
      text-align: center;
      margin-top:3%;
  }
  .first{
      position: relative;
      margin-left:8%;
      width:84%;
      height:200px;
      box-sizing: border-box;
    }
    .first>div:nth-of-type(1){
        display: inline-block;
        width:48%;
        height:100%;
    }
    .first>div img{
        width:100%;
        height:100%;
    }
    .first>div:nth-of-type(2){
        display: inline-block;
       width:52%;
       background-color: white;
       position: absolute;
       top:0px;
       height:100%; 
    }
    .first>div>h5{
        height:100%;
       margin-left: 10%;
    }
    .page{
        margin-top:20px;
        width:40%;
        height:80px;
        margin-left:52%;
    }
    .page>ul{
        width:100%;
        height:100%;
    }
    .page>ul>li{
       list-style:none;
       display: inline-block;
    }
}
   @media (min-width:992px){ 
     .show{
      width:50%;
      margin-left:25%;
     }
     .content{
         margin-top:30px;
          height:180px;
     }
    .content>div{
        background-color: white;
        height:100%;
        margin-left:10%;
        box-sizing: border-box; 
    }
    .content>div>div{
        height:80%;
          overflow: hidden;
    }
    .content>div img{
        cursor: pointer;
		transition: all 0.6s;
        width:100%;
        height:80%;
    }
    .content>div>h5{
     margin-top:0;
     text-align: center;
    }
    .first{
        position: relative;
      margin-left:27%;
      width:48%;
      height:200px;
      box-sizing: border-box;
    }
    .first>div:nth-of-type(1){
        display: inline-block;
        width:65%;
        height:100%;
    }
    .first>div img{
        width:100%;
        height:100%;
    }
    .first>div:nth-of-type(2){
        display: inline-block;
       width:35%;
       background-color: white;
       position: absolute;
       top:0px;
       height:100%; 
    }
    .first>div>h5{
        height:100%;
       margin-left: 10%;
    }
    .page{
        margin-top:20px;
        width:30%;
        height:80px;
        margin-left:52%;
    }
    .page>ul{
        width:100%;
        height:100%;
    }
    .page>ul>li{
       list-style:none;
       display: inline-block;
    }
   }
</style>