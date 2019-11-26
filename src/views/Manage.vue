<template>
   <el-container >
  <el-aside   style="border:3px solid rgb(247,247,247)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1" style="border:3px solid rgb(247,247,247)">
        <template slot="title" ><i class="el-icon-document"></i>文章</template>
        <el-menu-item-group>
            <router-link to="/manageIndex/postAritcle">
                <el-menu-item index="1-1">发布文章 </el-menu-item>
            </router-link>
             <router-link to="/manageIndex/manageAritcle">
               <el-menu-item index="1-2" >管理文章 </el-menu-item>
             </router-link>
         
           <el-menu-item index="1-3" >草稿夹</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2" style="border:3px solid rgb(247,247,247)">
        <template slot="title"><i class="el-icon-connection"></i>评论管理</template>
      </el-submenu>
      <el-submenu index="3" style="border:3px solid rgb(247,247,247)">
        <template slot="title"><i class="el-icon-setting"></i>设置</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
   </el-container>
</template>

<style scoped>
  .el-aside {
      width:20%;
      margin-top:20px;
     margin-left:50px;
     height:1100px;
  }
 .el-menu-item{
     border-bottom: 2px solid rgb(247,247,247);
 }
 .el-container{
   display: inline-block;
 }
 a{
   text-decoration: none;
   color:black;
 }
</style>

