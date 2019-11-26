
<template>
    <header class="header" id="header">
        <div class="wrapper">
            <el-row >
                <el-col :span="10">
                    <div class="grid-content ">
                         <a>
                            <img src="https://avatars1.githubusercontent.com/u/28499061?v=4"/>
                           <router-link to="/"> <label>个人博客</label></router-link>
                         </a>
                    </div>
                </el-col>
                <el-col :span="12" class="hidden-sm-and-down" :pull="2" >
                    <div class="grid-content ">
                          <nav class="header__nav mobile__none">
                              <el-row>
                                    <el-col :span="6">
                                        <div class="grid-content ">
                                              <router-link to="/loginManage" >
                                                管理
                                              </router-link>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content ">
                                              <a >
                                                Archives
                                              </a>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content ">
                                              <a>
                                                Links
                                              </a>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content "  >
                                               <router-link to="/search">
                                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                                        <path fill="#444" d="M19.385 11.846c0-4.156-3.382-7.538-7.538-7.538s-7.538 3.382-7.538 7.538 3.382 7.538 7.538 7.538 7.538-3.382 7.538-7.538zM28 25.846c0 1.178-0.976 2.154-2.154 2.154-0.572 0-1.127-0.236-1.514-0.639l-5.772-5.755c-1.969 1.363-4.325 2.087-6.714 2.087-6.546 0-11.846-5.3-11.846-11.846s5.3-11.846 11.846-11.846 11.846 5.3 11.846 11.846c0 2.389-0.724 4.745-2.087 6.714l5.772 5.772c0.387 0.387 0.623 0.942 0.623 1.514z"></path>
                                                    </svg>
                                               </router-link>
                                        </div>
                                    </el-col>
                              </el-row> 
                         </nav>
                    </div>
                </el-col>
                <el-col :span="12" class="hidden-sm-and-up " :push="6" >
                    <el-dropdown>
                      <span class="el-dropdown-link">
                                <div class="grid-content ">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                            <path fill="#444" d="M0 3h20v2h-20v-2zM0 9h20v2h-20v-2zM0 15h20v2h-20v-2z"></path>
                                        </svg>
                                </div>
                      </span>
                                        <el-dropdown-menu slot="dropdown">
                                             <main class="header__menu fn__none">
                                                <ul>
                                                     <li>
                                                         <el-dropdown-item>
                                                             <router-link to="/loginManage" >
                                                                管理
                                                            </router-link>
                                                         </el-dropdown-item>
                                                     </li>
                                                      <li>
                                                         <el-dropdown-item>
                                                            <a >
                                                                 我的开源
                                                            </a>
                                                         </el-dropdown-item>
                                                     </li>
                                                     <li>
                                                         <el-dropdown-item>
                                                            <a >
                                                                  Tags
                                                            </a>
                                                         </el-dropdown-item>
                                                     </li>
                                                     <li>
                                                         <el-dropdown-item>
                                                            <a >
                                                                   Archives
                                                            </a>
                                                         </el-dropdown-item>
                                                     </li>
                                                  </ul>
                                            </main>
                                        </el-dropdown-menu>
                    </el-dropdown>
                               
                </el-col>
            </el-row>
        </div>
    </header>
</template>

<script>
export default {
    
}
</script>


<style  scoped>
    a{
        text-decoration: none;
        color:black;
    }
  .wrapper{
      padding:0px;
      margin:0px;
      width:100%;
      height:100px;
  }
  .grid-content{
      line-height: 100px;
      text-align: center;
      height:100px;
  }
  .grid-content img{
      display: inline-block;
      position: absolute;
      top:0px;
      left:50px;
      width:100px;
      height:100px;
  }
  .grid-content label{
      position: absolute;
    height:100px;
    line-height: 100px;
      left:155px;
      letter-spacing:5px;
      display: inline-block;
      color:orange;
  }
 .header__menu ul{
     width:100px;
     padding:0px;
     margin:0px;
 }
 .header__menu ul li{
     width:100%;
     height:50px;
      list-style-type: none;
      text-align: center;
     padding:0px;  
 }
</style>

