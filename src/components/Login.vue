<template>
<div class="container">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名:" prop="username" class="form">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off" class="input"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email" class="form">
            <el-input type="text" v-model="ruleForm.email" autocomplete="off" class="input"></el-input>
        </el-form-item>
        <el-form-item class="form">
            <el-button type="primary" @click="submitForm('ruleForm')" class="button">登录</el-button>
            <el-button @click="resetForm('ruleForm')" class="button">重置</el-button>
        </el-form-item>
        </el-form>
</div>
</template>
<script>
import axios from 'axios';
  export default {
    data() {
     var checkemail= (rule, value, callback) => {
            const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            if (value=="") {
            return callback(new Error('邮箱不能为空'))
            }else{
                callback();
            }
            setTimeout(() => {
            if (mailReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的邮箱格式'))
            }
            }, 100)
        }
      var username = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
         username: '',
         email:''
        },
        user:{
         userName:"",
         emailOrGithub:"",
         userCode:"",
         userType:""
        },
        rules: {
         username: [
            { validator:username, trigger: 'blur' }
          ],
         email: [
            { validator:checkemail, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             axios.get("http://www.qz-hotpot.xyz:8081/blog/users/login/visitor",{
                 params:{
                     userName:this.ruleForm.username,
                     email:this.ruleForm.email
                 }
             }).then((res)=>{
                if(res.status==200){
                    this.user.userName=res.data.userName;
                    this.user.emailOrGithub=res.data.emailOrGithub;
                    this.user.userCode=res.data.userCode;
                    this.user.userType=res.data.userType;
                  localStorage.setItem("name",JSON.stringify(this.user));
                    let path=localStorage.getItem("path");
                    this.$router.push("/articles/"+path);
                     this.$refs[formName].resetFields();
                }else if(res.status==404){
                    alert("404 NOT FOUND!!!")
                }
             }).catch((err)=>{
                 alert(err.response.data);
                 return
             })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.container{
    width:50%;
    height:50%;
    position: absolute;
    top:25%;
    left:50%;
   margin-left:-25%;
   padding:20px;
    border:2px solid rgb(247,247,247);
}
 
 @media (max-width:767px){
     .form{
  padding:0px;
  margin-top:18%;
}
   .button{
    margin-left:-1%;
}
 .input{
    width:90%;
}
 }
 @media (min-width:767px){
    .form{
  padding:0px;
  margin-top:8%;
}
 .input{
    width:70%;
}
.button{
    margin-left:15%;
}
 }
</style>