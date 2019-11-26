<template>
    <div class="container">
        <p class="p">评论</p>
        <el-row>
            <el-col :span="12" :offset="6">
                <router-link :to="url">
                    <el-input type="textarea" :rows="3"
                                placeholder="请输入评论内容" v-model="textarea" :readonly="flag ? false :'readonly' ">
                    </el-input>
                </router-link>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="6" style="margin-top:4px;margin-bottom:4px;" :span="2">
                <el-button type="primary" @click="add" size="small">添加</el-button>
            </el-col>
        </el-row>
        <div class="d1">
             <ul>
                 <li v-for="(list,index) in lists" :key="list.id">
                     <el-row style="margin-bottom:4px;margin-top:5px;">
                        <el-col :span="1" :offset="1"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="small"></el-avatar></el-col>
                        <el-col :span="12" style="color:#303133;font-size:15px;margin-top:2px;margin-top: 4px;margin-left: 4px;">{{list.userName}}</el-col>
                    </el-row>

                    <el-row style="margin-bottom:12px;">
                        <el-col :span="23" :offset="1" style="color:#606266;font-size:15px;">
                            {{list.content}}
                        </el-col>
                    </el-row>

                    <el-row v-if="list.children != null && list.children.length != 0" >
                        <el-col :span="20" :offset="1" style="border-radius: 4px;padding-top:2px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                            <el-row v-for="child in list.children" :key="child.id">
                                <el-col :span="20" >
                                    <el-row style="margin-left:10px;"  :key="child.id">
                                        <el-col :span="1"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="small"></el-avatar></el-col>
                                        <el-col :span="12" style="color:#303133;font-size:15px;margin-top:2px;margin-top: 4px;margin-left: 4px;">{{child.userName}}</el-col>
                                    </el-row>
                                    <el-row style="margin-bottom:12px;margin-top:5px;margin-left:14px;">
                                        <el-col :span="23" style="color:#606266;font-size:15px;">
                                            {{child.content}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>

                    <el-row style="color:#909399;font-size:14px;border-bottom:4px solid rgb(247,247,247);margin-top:8px;">
                        <el-col :offset="1" :span="3" style="padding-bottom:3px;">
                            {{list.diffTime}}
                        </el-col>
                        <el-col :span="1" :offset="16">
                            <i class="el-icon-star-off pointer" @click="like(list.code)">{{list.likeNumber}}</i>
                        </el-col>
                        <el-col :span="2">
                            <i class="el-icon-chat-round pointer" @click="showCommentInput(index)">&nbsp;回复</i>
                        </el-col>
                    </el-row>
                 </li>
             </ul>
            <div id="comment-input" v-if="showComment">
                <el-row>
                    <el-col :offset="1" :span="22" style="margin-bottom:4px;">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="applayContent">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row style="margin-top:3px;margin-bottom:12px;">
                    <el-col :offset="1">
                        <el-button type="primary" @click="addReplay()" size="small">提交</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import $ from "jquery";
export default {
    data(){
        return{
            url:"",
            textarea:"",
            applayContent:"",
            applayIndex:0,
            name:"",
            flag:false,
            lists:[],
            content:[],
            commentBack:{},
            showComment:false,
            code:""
        }
    },
    methods:{
        like(code){
             console.log(code);
             console.log(this.name.userCode);
             axios.get(`http://www.qz-hotpot.xyz:8081/blog/comments/like/${code}`,{
                 params:{
                     userCode:this.name.userCode,
                 }
             }).then((res)=>{
                   this.$message.success('点赞成功');
                   this.getInfo();
             }).catch((err)=>{
                    this.$message.error(err.response.data);
                    return;
             })
        },
        getUser(){
            this.name=JSON.parse(localStorage.getItem("name"));
            if(this.name==null){
           
            }else{
                this.flag=true;
            }
            if(this.flag){
               this.url="/articles/"+this.$route.params.code;
            }else{
               
                 this.url="/login"
            }
        },
        getInfo(){
           axios.get(`http://www.qz-hotpot.xyz:8081/blog/comments/${this.$route.params.code}`).then((res)=>{ 
                if(res.status==200){
                     this.lists=res.data;
                }else if(res.status==404){
                     alert("404 NOT FOUND");
                }
            }).catch((err)=>{
                this.$message.error(err.response.data);
                 return;
             })
        },
        add(){
            if(this.name == null){
                this.$router.push("/login");
            }
            if(this.textarea==""){
                this.$message.warning('请发表你的评论！！！');
            }else{
                axios.post("http://www.qz-hotpot.xyz:8081/blog/comments",{
                  articleCode:this.$route.params.code,
                  content:this.textarea,
                  userCode:this.name.userCode,
                  userName:this.name.userName
              }).then((res)=>{
                  if(res.status==200){
                      this.$message.success('评论成功');
                        this.getInfo();
                  }else if(res.status==404){
                      alert("404 NOT FOUND!!!")
                  }
              }).catch((err)=>{
                this.$message.error(err.response.data);
                return
             }) 
              this.textarea=""; 
            }
             
        },
        addReplay() {
            const index = this.applayIndex;
            if(this.name == null){
                this.$router.push("/login");
            }
            // 去掉@xxx
            var i = this.applayContent.indexOf('\n');
            var msg = this.applayContent.slice(i + 1);
            axios.post("http://www.qz-hotpot.xyz:8081/blog/comments",{
                  articleCode:this.$route.params.code,
                  content:msg,
                  userCode:this.name.userCode,
                  userName:this.name.userName,
                  originalCommentCode:this.lists[index].code,
                  originalCommentUserCode:this.lists[index].userCode,
                  originalCommentUserName:this.lists[index].userName
              }).then((res)=>{
                  if(res.status==200){
                      this.$message.success('评论成功');
                      this.showComment=false;
                      this.applayContent="";
                        this.getInfo();
                  }
              }).catch((err)=>{
                  this.$message.error(err.response.data);
                 return;
             })
        },
        showCommentInput(index){
            this.applayContent = '@' + this.lists[index].userName + '\n';
            this.applayIndex = index;
            this.showComment = true;
            setTimeout(() => {
                window.scrollTo(0,document.body.scrollHeight);
            }, 200);
        }
    },
    mounted(){
         this.getUser();
        this.getInfo();
    }
}
</script>

<style scoped>
   .container{
       width:100%;
       margin-top:20px;
       background-color: rgb(247, 247, 247);
   }
   .p{
       text-align: center;
   }
  @media (max-width: 767px){
       .input{
      width:90%;
      margin-left:5%;
  }
  .d1{
       width:90%;
       margin-left:5%;
      background-color: white;
  }
  .d1 ul{
      width:90%;
      margin-left:5%;
      padding:0px;
  }
  .d1 ul li{
      margin-top:5px;
    padding-top:3px;
    list-style: none;
    width:100%;
    border-bottom: 4px solid rgb(247,247,247);
    position: relative;
    padding-left:0px;
  }
 
  .d1 span{
      display: block;
  }
  .d1 p{
      text-indent: 20px;
  }
  .button{
     width:20%;
     margin-left:40%;
  }
  }
  @media (min-width: 767px){
    .input{
      width:50%;
      margin-left:25%;
  }
  .d{
      display:inline-block;
      top:-13px;
      width:20%;
      position:relative;
  }
  .button{
      display: inline-block;
     
  }
  .d1{
       width:50%;
      margin-left:25%;
      background-color: white;
  }
  .d1 ul{
      width:100%;
      padding:0px;
  }
  .d1 ul li{
      margin-top:5px;
    padding-top:3px;
    list-style: none;
    width:100%;
    border-bottom: 4px solid rgb(247,247,247);
    position: relative;
    padding-left:0px;
  }
  .d1 span{
      display:block;
  }
  .d1 p{
      text-indent:100px;
  }
  }
.pointer:hover{
    cursor: pointer;
}
 
</style>
