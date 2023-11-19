<template>
    <div class="header-container">
        <div class="header-container-title">
            面向对象课程学习助手
            <div v-if="!isLogin">
                <el-button size="large" plain color="#4840ba" style="--el-button-bg-color: #f6e9e1;" @click="handleLoginOpen">Sign up</el-button>
                <el-button size="large" type="primary" color="#4840ba" @click="handleSignOpen">Log in</el-button>
            </div>

            <div style="margin-right: 10px;" v-else class="image-menu">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                <div style="font-size: 17px;padding-top: 5px;margin-left: 6px;">
                    {{ commonStore.userName }}
                </div>
                <div style="padding-top: 10px;padding-left: 10px;">
                    <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="resetPasswordVisible = true">修改密码</el-dropdown-item>
                            <el-popconfirm title="Are you sure to delete this?">
                                <template #reference>
                                    <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                                </template>
                            </el-popconfirm>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                </div>
            </div>

        </div>
        <div class="header-container-desc">
            <img src="/src/assets/image/cover.jpg" alt="">
            <div class="description">
                <div class="description-title">基于ChatGPT</div>
                <div class="description-tit">面向对象课程体系</div>
                <div class="description-desc">超越传统学习，探索未来编程！借助我们的ChatGPT辅助工具，面向对象编程变得如此轻松。探索编程的无限可能性，与ChatGPT一起掌握OOP世界。</div>
                <el-button type="primary" color="#4840ba" size="large" @click="handleCreate">提问&nbsp;ChatGPT</el-button>
            </div>
        </div>


        <!-- 登录弹窗 -->
        <el-dialog
            v-model="commonStore.isLoginDialogOpen"
            width="50%"
        >
            <div class="login-dialog">
                <div class="login-dialog-left"></div>
                <div class="login-dialog-right">
                    <div class="title">
                        <div :class="{ 'isActiveTitle': isActiveLogin }" @click="clickLoginTitle">登录</div>
                        <div :class="{ 'isActiveTitle': isActiveSign }" @click="clickSignTitle">注册</div>
                    </div>

                    <!-- 登录 -->
                    <div class="login" v-if="isActiveLogin == true">
                        <el-input v-model="userCount"  placeholder="请输入用户账号" size="large" style="margin-bottom: 16px;" >
                            <template #prefix>
                                <i class="iconfont icon-zhanghao"></i>
                            </template>
                        </el-input>
                        <el-input v-model="userPassword"  placeholder="请输入密码" show-password size="large" type="password" >
                            <template #prefix>
                                <i class="iconfont icon-mima-copy"></i>
                            </template>
                        </el-input>
                        <el-checkbox v-model="isCheck" label="记住密码" />
                        <div class="changePassword" @click="resetPasswordVisible = true">修改密码</div>
                        <div class="login-btn">
                            <el-button type="primary" @click="handleLoginIn" style="width: 80%; margin: 30px 30px 10px 30px;" color="#e69138" >立即登录</el-button>
                        </div>
                        <div style="text-align: center; color: #999;">
                            暂无账号，
                            <el-tooltip content="无法使用收藏、提问ChatGPT功能" placement="bottom" effect="light">
                                <el-text tag="ins" style="color: #e69138;cursor: pointer;" @click="cancelLogin">游客登录</el-text>
                            </el-tooltip>
                        </div>
                    </div>

                    <!-- 注册 -->
                    <div class="sign" v-if="isActiveSign == true">
                        <el-input v-model="newUserCount"  placeholder="请输入用户注册账号" size="large" style="margin-bottom: 16px;" >
                        </el-input>
                        <el-input v-model="newUserPassword1" type="password" show-password placeholder="请输入密码" size="large" style="margin-bottom: 16px;" >
                        </el-input>
                        <el-input v-model="newUserPassword2" type="password" show-password placeholder="确认账户密码" size="large" >
                        </el-input>
                        <div class="login-btn">
                            <el-button type="primary" @click="handleSign" style="width: 80%; margin: 30px 30px 10px 30px;" color="#e69138" >注册</el-button>
                        </div>
                        <div style="text-align: center; color: #999;">
                            <el-tooltip content="无法使用收藏、提问ChatGPT功能" placement="bottom" effect="light">
                                <el-text tag="ins" style="color: #e69138;cursor: pointer;" @click="cancelLogin">游客登录</el-text>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
            </div>

            <el-dialog
                v-model="resetPasswordVisible"
                width="30%"
                append-to-body
                title="密码重置"
                @closed="closeResetDialog"
                align-center
            >
                <div class="flex">
                    <div class="w-50">用户账号</div>
                    <el-input v-model="userCount"  placeholder="请输入用户注册账号" size="large" >
                    </el-input>
                </div>
                <div class="flex">
                    <div class="w-50">旧密码</div>
                    <el-input v-model="oldResetPassword" type="password" show-password placeholder="请输入旧密码" size="large" style="margin: 7px 0px 0px 0px;" >
                    </el-input>
                </div>
                <div class="flex">
                    <div class="w-50">新密码</div>
                    <el-input v-model="newResetPassword1" type="password" show-password placeholder="请输入新密码" size="large" style="margin: 7px 0px;">
                    </el-input>
                </div>
                <div class="flex">
                    <div class="w-50">确认新密码</div>
                    <el-input v-model="newResetPassword2" type="password" show-password placeholder="确认新密码" size="large" >
                    </el-input>
                </div>
                <div class="login-btn">
                    <el-button plain style="margin: 20px 0px 0px 150px;" color="#e69138" @click="closeResetDialog">取消</el-button>
                    <el-button type="primary" @click="handleResetPassword" style="margin: 30px 30px 10px 34px;" color="#e69138" >重置密码</el-button>
                </div>
            </el-dialog>
        </el-dialog>

        <div class="header-container-divi"></div>
    </div>
</template>

<script setup lang="ts">
import { fetchLoginIn, fetchSignIn, fetchResetPassword, fetchCollectList } from '@/apis';
import { ref, onMounted } from 'vue';
import router from '@/router/index.ts';
import { ElMessage } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { isKeyInSessionStorage, debounce } from '@/until';
import { useCommonStore } from '@/store';

const commonStore = useCommonStore();

const isLogin = ref(false);

onMounted(() => {
    isLogin.value = isKeyInSessionStorage('AI-token');
})

const handleCreate = () => {
    router.push('/ai-create');
}


//登录
const userCount = ref('');
const userPassword = ref('');
const isCheck = ref(true);

const handleLoginOpen = () => {
    commonStore.setLoginDialogOpen(true);
    isActiveLogin.value = false;
    isActiveSign.value = true;
}

const handleLoginIn = async () => {
    if(userCount.value === '' || userPassword.value === '') {
        return ElMessage.error('用户名或密码不能为空！');
    }
    try {
        const params = {
            username: userCount.value,
            password: userPassword.value
        }
        const result = await fetchLoginIn(params);
        commonStore.setUserName(result.data.userInfo.nickname)
        sessionStorage.setItem('AI-token', result.data.token);
        ElMessage.success('登录成功！');
        commonStore.setLoginDialogOpen(false);
        userCount.value = '';
        userPassword.value = '';

        isLogin.value = isKeyInSessionStorage('AI-token');

        const collectResult = await fetchCollectList();
        commonStore.setCollectList(collectResult.data);
    } catch(err: any) {
        ElMessage.error(err);
    }
}

const cancelLogin = () => {
    commonStore.setLoginDialogOpen(false);
    ElMessage.warning('无法使用收藏功能、提问ChatGPT功能')
}

const isActiveLogin = ref(true);
const isActiveSign = ref(false);
const clickLoginTitle = () => {
    isActiveLogin.value = true;
    isActiveSign.value = false;
}
const clickSignTitle = () => {
    isActiveLogin.value = false;
    isActiveSign.value = true;
}

//注册
const newUserCount = ref('');
const newUserPassword1 = ref('');
const newUserPassword2 = ref('');

const handleSignOpen = () => {
    commonStore.setLoginDialogOpen(true);
    isActiveSign.value = false;
    isActiveLogin.value = true;
}

const handleSign = async () => {
    if( newUserPassword1.value !== newUserPassword2.value) {
        ElMessage.error('两次输入的密码不一致！');
        return;
    }
    try {
        const params = {
            password: newUserPassword1.value,
            username: newUserCount.value
        }
        await fetchSignIn(params);
        ElMessage.success('注册成功！');
        commonStore.setLoginDialogOpen(false);
        newUserCount.value = '';
        newUserPassword1.value = '';
        newUserPassword2.value = '';
    } catch (error: any) {
        ElMessage.error(error);
    }
}

//密码重置
const resetPasswordVisible = ref(false);
const oldResetPassword = ref('');
const newResetPassword1 = ref('');
const newResetPassword2 = ref('');

const handleResetPasswordDebounced = debounce(async () => {
  if (newResetPassword1.value !== newResetPassword2.value) {
    ElMessage.error('两次输入的密码不一致！');
    return;
  }

  try {
    const params = {
      password: oldResetPassword.value,
      newPassword: newResetPassword1.value,
      username: userCount.value,
    };

    await fetchResetPassword(params);
    ElMessage.success('密码重置成功！');
    resetPasswordVisible.value = false;
  } catch (error: any) {
    ElMessage.error(error);
  }
}, 500); 

const handleResetPassword = () => {
  handleResetPasswordDebounced();
};

const closeResetDialog = () => {
    resetPasswordVisible.value = false;
    oldResetPassword.value = '';
    newResetPassword1.value = '';
    newResetPassword2.value = '';
}

//退出登录
const handleLogout =  () => {
    try {
        sessionStorage.removeItem('AI-token'); 

        handleSignOpen();
        ElMessage.success('退出登录成功！');
        isLogin.value = isKeyInSessionStorage('AI-token');
  } catch (error) {
    console.error('退出登录失败', error);
  }
}
</script>

<style lang="scss" scoped>
.header-container {
    .header-container-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 26px 26px 0px 26px;
        font-size: 34px;
        font-weight: bold;
        color: #220a58;
        .image-menu {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-content: center;
        }
        .el-button {
            width: 130px;
        }
    }
    .header-container-desc {
        display: flex;
        flex-direction: row;
        padding: 26px;
        img {
            width: 650px;
        }
        .description {
            flex: 1;
            margin-left: 30px;
            color: #351c75;
            .description-title {
                font-size: 50px;
                font-weight: 600;
            }
            .description-tit {
                font-size: 45px;
            }
            .el-button {
                margin-top: 30px;
                width: 150px;
            }
        }
    }
    .header-container-divi {
        height: 20px;
        width: 100%;
        color: #e69138;
        font-size: 34px;
        font-weight: 600;
        background: linear-gradient(to right, #351c75, #f1f1f1);
        background-color: #351c75;
        margin-top: 10px;
        padding-left: 26px;
    }
}
.login-dialog {
    display: flex;
    flex-direction: row;
    height: 400px;
    .login-dialog-left {
        width: 70%;
        background-image: url(../assets/image/login.jpg);
        background-size:auto 100%;
    }
    .login-dialog-right {
        padding: 60px 20px 20px 20px;
        .title {
            display: flex;
            flex-direction: row;
            margin-left: 130px;
            padding: 2px;
            gap: 40px;
            font-size: 20px;
            font-weight: 550;
            color: #999999;
            cursor: pointer;
            .isActiveTitle {
                color: black;
                border-bottom: 3px solid #e69138;
            }
        }
        .login {
            padding: 20px;
            .changePassword {
                float: right;
                color: #999999;
                margin-top: 8px;
                margin-right: 4px;
                cursor: pointer;
            }
        }
        .sign {
            padding: 20px;
        }
    }
}
.flex {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.w-50 {
    width: 90px;
}
:deep(.el-dialog__header) {
    display: contents;
}
:deep(.el-dialog__body) {
    padding: 0px;
}
:deep(.el-input--large .el-input__wrapper) {
    padding: 1px 10px;
    background-color: #f7f7f7;
    border-radius: 15px;
    box-shadow:none
}
:deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
    color: #e69138;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: #e69138;
    border-color: #e69138;
}
:deep(.el-input__inner) {
    padding: 0px 8px;
}
:deep(.el-dialog__title) {
    font-size: 20px;
    font-weight: 600;
    color: black;
    margin-left: 100px;
}

//图标颜色
.icon-zhanghao, .icon-mima-copy {
    color: #e69138;
    font-size: 20px;
}
</style>