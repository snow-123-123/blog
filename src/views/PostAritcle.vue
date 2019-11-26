<template>
    <div class="container">
        <div>
             标题:<el-input v-model="title" >{{code}}</el-input>
        </div>
        <div class="content">
            正文:
                <mavon-editor v-model="content" :defaultOpen = "'preview'" :subfield = "true"
                            :toolbarsFlag = "true" :editable="true" :scrollStyle="true" :ishljs = "true">
                </mavon-editor>
        </div>
        <div>
            标签(使用英文输入状态下的逗号进行分隔):
            <el-input v-model="tag"></el-input>
        </div>
        <div >
            摘要:
             <mavon-editor v-model="abstractText" :subfield = "false"
                   :toolbarsFlag = "true" :editable="true" :scrollStyle="true" :ishljs = "true">
                </mavon-editor>
        </div>
        <div>
            选择图片:
            <el-input type="file" v-model="imgUrl"></el-input>
        </div>
        <div class="bottom right">
            访问密码:<el-input class="bottom" v-model="viewPwd" type="password"></el-input>
         </div>
        <div class="btn">
             <el-checkbox v-model="commentable">允许评论</el-checkbox>
            <el-button type="success">保存草稿夹</el-button>
            <el-button type="warning" @click="post" :plain="true">发布</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import $ from "jquery";
export default {
    data(){
        return{
           title:"",
           content:"",
           manage:{},
           tag:"",
           text:"",
           abstractText:"",
           viewPwd:"",
           commentable:true,
           imgUrl:"",
           code:"",
           flag:true
        }
    },
    methods:{
        manageInfo(){
            this.manage=JSON.parse(localStorage.getItem("admin"));
        },
        post(){
            if(this.content==""||this.title==""||this.abstractText==""||this.tag==""||this.viewPwd==""){
                 this.$message({
                        message:"请将信息填写完整!!!",
                        type:'warning'
                        });
            }else{
            if(this.flag){
                 var tags=this.tag.split(",");
                    if(this.commentable){
                    axios.post("http://www.qz-hotpot.xyz:8081/blog/articles",{
                        "content":this.content,
                        "authorCode":this.manage.userCode,
                        "title":this.title,
                        "abstractText":this.abstractText,
                        "commentable":1,
                        "status":0,
                        "tags":tags,
                        "viewPwd":this.viewPwd,
                        "imgUrl":this.imgUrl
                }).then((res)=>{
                            this.content=this.title=this.abstractText=this.tag=this.viewPwd=this.code=this.imgUrl="";
                              this.$message({
                                            message: '发布成功',
                                            type: 'success'
                                            });
                           
                }).catch((err)=>{
                        this.$message.err(err.response.data);
                        return
                    })
                    }else{
                    axios.post("http://www.qz-hotpot.xyz:8081/blog/articles",{
                        "content":this.content,
                        "authorCode":this.manage.userCode,
                        "title":this.title,
                        "abstractText":this.abstractText,
                        "commentable":0,
                        "status":0,
                        "tags":tags,
                        "viewPwd":this.viewPwd,
                        "imgUrl":this.imgUrl,
                }).then((res)=>{
                            this.content=this.title=this.abstractText=this.tag=this.viewPwd=this.code=this.imgUrl="";
                            this.$message({
                                            message: '发布成功',
                                            type: 'success'
                                            });
                }).catch((err)=>{
                       this.$message.error(err.response.data);
                        return
                    }) 
                    }
            }else{
                   var tags=this.tag.split(",");
                    if(this.commentable){
                    axios.put("http://www.qz-hotpot.xyz:8081/blog/articles",{
                        "content":this.content,
                        "authorCode":this.manage.userCode,
                        "title":this.title,
                        "abstractText":this.abstractText,
                        "commentable":1,
                        "status":0,
                        "tags":tags,
                        "viewPwd":this.viewPwd,
                        "imgUrl":this.imgUrl,
                        "code":this.code
                }).then((res)=>{
                            this.content=this.title=this.abstractText=this.tag=this.viewPwd=this.code=this.imgUrl="";
                            this.$message({
                                            message:'更新成功',
                                            type: 'success'
                                            });
                }).catch((err)=>{
                       this.$message.err(err.response.data);
                        return
                    })
                    }else{
                    axios.put("http://www.qz-hotpot.xyz:8081/blog/articles",{
                        "content":this.content,
                        "authorCode":this.manage.userCode,
                        "title":this.title,
                        "abstractText":this.abstractText,
                        "commentable":0,
                        "status":0,
                        "tags":tags,
                        "viewPwd":this.viewPwd,
                        "imgUrl":this.imgUrl,
                        "code":this.code
                }).then((res)=>{
                            this.content=this.title=this.abstractText=this.tag=this.viewPwd=this.code=this.imgUrl="";
                            this.$message({
                                            message: '更新成功',
                                            type: 'success'
                                            });
                }).catch((err)=>{
                       this.$message.err(err.response.data);
                        return
                    }) 
                    }
            }
           }
           
        },
        getCode(){
             this.code=sessionStorage.getItem("code");
             if(this.code==null||this.code==""){
             }else{
                 this.flag=false;
                 axios.get(`http://www.qz-hotpot.xyz:8081/blog/articles/${this.code}`).then((res)=>{
                       this.title=res.data.title;
                       this.content=res.data.content;
                       this.tag=res.data.tags;
                       this.abstractText=res.data.abstractText;
                       this.imgUrl=res.data.imgUrl;
                       this.viewPwd=res.data.viewPwd;
                       var commentable=res.data.commentable;
                       if(commentable==0){
                           this.commentable=false;
                       }else{
                          this.commentable=true;
                       }
                       sessionStorage.removeItem("code");
                 }).catch((err)=>{
                     alert(err.response.data);
                     return
                 })
             }
        }
    },
    mounted(){
       this.manageInfo();
       this.getCode();
       $(".el-menu>li:nth-of-type(1)>ul>li>ul>a:nth-of-type(1)>li").addClass("is-active");
       if(  $(".el-menu>li:nth-of-type(1)>ul>li>ul>a:nth-of-type(1)>li").parent("a").siblings("a").children("li").hasClass("is-active")){
               $(".el-menu>li:nth-of-type(1)>ul>li>ul>a:nth-of-type(2)>li").removeClass("is-active");
       }
        $(".el-menu>li:nth-of-type(1)>ul>li>ul>a:nth-of-type(1)>li").parent("a").siblings("a").children("li").click(function(){
              $(".el-menu>li:nth-of-type(1)>ul>li>ul>a:nth-of-type(1)>li").removeClass("is-active");
        })
   }
}
</script> 

<style scoped>
 .container{
     background-color: rgb(247,247,247);
     width:53%;
     display: inline-block;
     position:absolute;
     top:129px;
     font-size:24px;
     left:360px;
     font-family: cursive;
     padding-left:10px;
     height:1100px;
     box-sizing: border-box;
 }
 .container>div{
     margin-top:20px;
 }
 .shadow{
    height:100px;
 }
 .bottom{
     display: inline-block;
 }
 .left{
    width:60%;
    box-sizing: border-box;
 }
 .right{
   width:30%;
   margin-left:8%;
   box-sizing: border-box;
 }
 .btn{
     width:100%;
     margin-left:500px;
     margin-top:20px;
     right:0;
     clear:both;
 }
</style>