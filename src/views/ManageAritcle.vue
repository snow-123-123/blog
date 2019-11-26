<template>
    <div class="container">
        <div class="search">
            <el-input v-model="content" @keyup.enter.native="getInfo"></el-input>
            <el-button type="success" @click="getInfo"  :plain="true">搜索</el-button>
        </div>
        <div class="content" >
            <el-table :data="dataShow" style="width: 100%"  >
                <el-table-column prop="title" label="标题" width="150"></el-table-column>
                <el-table-column prop="createUser" label="作者" width="250"> </el-table-column>
                <el-table-column prop="commentCount" label="评论" width="60"></el-table-column>
                <el-table-column prop="viewCount" label="浏览" width="60"></el-table-column>
                <el-table-column prop="createTime" label="日期" width="130"></el-table-column>
                <el-table-column  label="操作" width="200" >
                     <template slot-scope="custom">
                        <div class="do">
                            <el-button size="mini" :plain="true" @click="update(custom.row.code)" >更新</el-button>
                            <el-button size="mini" :plain="true" @click="delect(custom.row.code)">删除</el-button>
                            <el-button size="mini" :plain="true" @click="top(custom.row.code)">置顶</el-button>
                        </div>
                     </template>
                    
                </el-table-column>
            </el-table>
        </div>
        <div class="page" >
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
    </div>
</template> 

<script>
import axios from 'axios';
import $ from "jquery";
export default {
     data() {
        return {
            content:"",
          tableData: [],
            // 总页数
        pageNum:1,
         //总数据
           totalPage:[],
            // 每页显示的个数
        pageSize:6,
        // 当前页
        currentpage:0,
        // 当前显示的数据
        dataShow:[],
        code:"",


        pageNum1:1,
        }
      },
      methods:{
          top(row){
               axios.get(`http://www.qz-hotpot.xyz:8081/blog/articles/top/${row}`,{
                   params:{
                       "articleCode":row
                   }
               }).then((res)=>{
                    this.$message({
                        message:"置顶成功",
                        type:'success'
                        });
               }).catch((err)=>{
                  this.$message.error(err.response.data);
                   return;
               }) 
          },
          getInfo(){
              if(this.content==""){
                   axios.get(`http://www.qz-hotpot.xyz:8081/blog/articles?currentPage=${this.pageNum}&pageSize=1000`).then((res)=>{
                      this.tableData=res.data.records;
                       //总页数
                this.pageNum=Math.ceil( res.data.total/ this.pageSize) || 1;
                  // 分组
                    for (var i = 0; i<this.pageNum; i++) {
                       this.totalPage[i] =this. tableData.slice(this.pageSize * i, this.pageSize * (i + 1))
                    }
                    // 取值
                this.dataShow =this.totalPage[this.currentpage];
                this.pageNum=1;
             }).catch((err)=>{
                 alert(err.response.data);
                 return
             })
              }else{
                   axios.get(`http://www.qz-hotpot.xyz:8081/blog/articles?currentPage=${this.pageNum}&pageSize=1000`,{
                       params:{
                           "title":this.content
                       }
                   }).then((res)=>{
                      this.tableData=res.data.records;
                      if(this.tableData==0){
                          this.$message({
                                        message: '暂无此文章',
                                        type: 'warning'
                                        });
                      }
                       //总页数
                this.pageNum=Math.ceil( res.data.total/ this.pageSize) || 1;
                  // 分组
                    for (var i = 0; i<this.pageNum; i++) {
                       this.totalPage[i] =this. tableData.slice(this.pageSize * i, this.pageSize * (i + 1))
                    }
                    // 取值
                this.dataShow =this.totalPage[this.currentpage];
                this.pageNum=1;
             }).catch((err)=>{
                this.$message.err(err.response.data);
                 return
             })
              }
          },
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
        delect(row){
           this.code=row;
           axios.delete(`http://www.qz-hotpot.xyz:8081/blog/articles/${this.code}`).then((res)=>{
                   this.$message({
                        message:"删除成功",
                        type:'success'
                        });
               axios.get(`http://www.qz-hotpot.xyz:8081/blog/articles?currentPage=${this.pageNum1}&pageSize=1000`).then((res)=>{
                      this.tableData=res.data.records;
                       //总页数
                this.pageNum1=Math.ceil( res.data.total/ this.pageSize) || 1;
                  // 分组
                    for (var i = 0; i<this.pageNum1; i++) {
                       this.totalPage[i] =this. tableData.slice(this.pageSize * i, this.pageSize * (i + 1))
                    }
                    // 取值
                this.dataShow =this.totalPage[this.currentpage];
                this.pageNum1=1;
             }).catch((err)=>{
                this.$message.error(err.response.data);
                 return
             })
           }).catch((err)=>{
               this.$message.error(err.response.data);
               return
           })
        },
        update(code){
             sessionStorage.setItem("code",code);
             this.$router.push("/manageIndex/postAritcle");
        }
      },
     mounted(){
         this.getInfo();
           $(".el-menu>li:nth-of-type(1)>ul>li>ul>a:nth-of-type(2)>li").addClass("is-active");
        $(".el-menu>li:nth-of-type(1)>ul>li>ul>a:nth-of-type(2)>li").parent("a").siblings("a").children("li").click(function(){
              $(".el-menu>li:nth-of-type(1)>ul>li>ul>a:nth-of-type(2)>li").removeClass("is-active");
        })
      }
}
</script>

<style scoped>
.container{
     background-color: rgb(247,247,247);
     width:65%;
     display: inline-block;
     position:absolute;
     top:129px;
     font-size:24px;
     left:360px;
     font-family: cursive;
     padding-left:10px;
     height:600px;
     box-sizing: border-box;
}
.search{
    margin:10px auto;
    width:90%;
    display: flex;
}
.el-input{
   flex:10;
}
.search button{
   flex:1;
}
.content{
    margin:10px auto;
    width:90%;
}
.page{
        margin-top:20px;
        width:50%;
        height:80px;
        margin-left:45%;
    }
    .page>ul{
        width:100%;
        height:100%;
    }
    .page>ul>li{
       list-style:none;
       display: inline-block;
    }
    .do{
     display: flex;
    }
    .do button{
        flex:1;
       
    }
</style>