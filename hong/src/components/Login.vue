<template>
	<div class="login_container">
		<div class="login_box">
			<!-- 头像区域 -->
			<div class="avatar_box">
				<img src="../assets/logo.png">
			</div>
			<!-- 登录表单区域 
			:model数据绑定
			:rules验证规则对象  prop指定不同验证规则   prop.username必须和v-model.username名称一致
			ref 表单引用对象 拿到表单的实例对象
			-->
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginForm_rules" label-width="0" class="login_form">
				<!-- 用户名 -->
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-s-goods" type="password"></el-input> 
				</el-form-item>
				<!-- 按钮 -->
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				/*这是登录表单的数据绑定对象*/
				loginForm:{
					username:'zs',
					password:'123'
				},
				/*这是表单的验证规则*/
				loginForm_rules:{
					/*验证用户名是否合法*/
					username:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					],
					/*验证密码是否合法*/
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
					]
				}
			} 
		},
		methods:{
			/*重置表单*/
			resetLoginForm(){
				this.$refs.loginFormRef.resetFields(); 
			},
			login(){
				this.$router.push('/home');  
				return
				 //表单登录之前预验证  valid 布尔值
				this.$refs.loginFormRef.validate((valid)=>{
					//如果不为true终止
					if(!valid) return;
					//通过http 发起一个post请求，请求地址login，请求参数是个对象loginForm
					//如果某个方法的返回值是Promise，可以用await asysc简化操作
					//const result=const{data :res} data 是result中得到的 res重命名
					//const result = await this.$http.post('login',this.loginForm)
					const {data :res} =this.$http.post('login',this.loginForm)
					if(res.meta.status!==200) return this.$message.error("登陆失败");
					this.$message.success("登陆成功")
					//1.将登陆成功之后的token 保存到客户端的sessionStorage中
					//	1.1项目中出了登录之外的其他api接口，必须在登陆之后才能访问
					//	1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
					window.sessionStorage.setItem("token",res.data.token);
					//2.通过编程式导航跳转到后台主页
 					this.$router.push('/home');
				}) 
			}
		}
	}
</script>

<!-- 支持less语法 -->
<!-- scoped Vue指令 控制style生效区间 只要是单文件组件一定要设置scoped  不写就是全局生效 -->
<!-- <style  lang="less" scoped></style>  使用lang="less" 需要安装组件 -->
<style scoped>
.login_container{
	background-color: #2b4b6b;
	height: 100%;
}
.login_box{
	width: 450px;
	height: 300px;
	background-color: #FFF;
	border-radius: 3px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%); /*平移自身的50%*/
}
.avatar_box{
	width: 130px;
	height: 130px;
	border:1px solid #EEE;
	border-radius: 50%;
	padding: 10px;
	box-shadow: 0 0 10px #DDD;
	position: absolute;
	left: 50%;
	transform: translate(-50%,-50%);
	background-color: #FFF;

}
img{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #EEE;
}
.btns{
	display: flex;/*弹性框模型*/
	justify-content: flex-end;/*尾部对齐*/
}
.login_form{
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 0 20px;
	box-sizing: border-box;/*默认表单是content-box*/

}
</style>