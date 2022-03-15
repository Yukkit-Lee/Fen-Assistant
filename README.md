# 大粪助手 Fen-Assistant <font size=2>(云开发)</font>

此项目面向私人，用于为[女友学习激励计划](https://docs.qq.com/doc/DSk91YUlLT2Vmc1pi)提供技术支持
目前有三项基本能力：

- 学习计时：通过简易按钮实现计时功能，并配合[女友学习激励计划](https://docs.qq.com/doc/DSk91YUlLT2Vmc1pi)实时计算积分
- 日程提醒：在小程序端新建日程提醒事项，通过微信订阅消息进行提醒
- 倒数日：每日同步更新倒数日信息，可新建倒数日日程

<br/>

## 使用说明

1.勾选 **【总是保持以上选择，不再询问】** 选项
<br/>
><font  size=1>鉴于微信订阅消息非特定商户每次只能发送一条订阅消息，若不勾选则可能导致日程提醒不成功</font>

  ![勾选](https://cloud1-1gbei9qk7777fe06-1309430445.tcloudbaseapp.com/image/QQ%E6%88%AA%E5%9B%BE20220315173235.png?sign=3c4e8fa093a269b6314bf56945b8377e&t=1647336893)
<br/>
<br/>
2.主页计时功能目前只针对个别用户开放
><font  size=1>非指定用户暂无权限，仅支持查看日志</font>

<br/>

3.可点击相应日程进行编辑与删除
<br/>
><font  size=1>用户只可对自己创建的日程进行编辑且所有日程每天0:00重置</font>

  ![编辑](https://cloud1-1gbei9qk7777fe06-1309430445.tcloudbaseapp.com/image/cuted.png?sign=174b4dc51b85f02499d78853804bec68&t=1647356110)
<br/>
<br/>
4. 可根据当前地址开启1.8倍速积分
<br/>
><font  size=1>每次计时与暂停计时都会记录位置同步数据库判断是否开启1.8倍</font>

  ![计时](https://cloud1-1gbei9qk7777fe06-1309430445.tcloudbaseapp.com/image/indexadd.png?sign=1e41b62d24a5d549869fa68332fca279&t=1647357521)
<br/>
<br/>
5. 若日程中未添加备注则自动生成小情话
<br/>
><font  size=1>情话数据并未存放在云开发数据库中，存放在小程序端</font>

  ![计时](https://cloud1-1gbei9qk7777fe06-1309430445.tcloudbaseapp.com/image/%E6%88%AA%E5%9B%BE11111.png?sign=302ba7070ab60f08a65964bac42aac52&t=1647358889)
<br/>
<br/>

## 技术引用

  - [腾讯位置服务](https://lbs.qq.com/service/webService/webServiceGuide/webServiceOverview) - 坐标逆解析
  - [iView](https://weapp.iviewui.com/) - Steps步骤条组件
<br/>
<br/>

## 效果图
![png1](https://cloud1-1gbei9qk7777fe06-1309430445.tcloudbaseapp.com/image/%E6%95%88%E6%9E%9C%E5%9B%BE1.png?sign=4dc5bdb85bb72ece7604415a70e31b63&t=1647359204)<br/>
![png2](https://cloud1-1gbei9qk7777fe06-1309430445.tcloudbaseapp.com/image/%E6%95%88%E6%9E%9C%E5%9B%BE2.png?sign=0b1866bd5e644a93d62099ef4e519616&t=1647359235)<br/>
![png3](https://cloud1-1gbei9qk7777fe06-1309430445.tcloudbaseapp.com/image/%E6%95%88%E6%9E%9C%E5%9B%BE3.jpg?sign=6148d3b62939ba91f5a5ee8ec2c361a6&t=1647359273)

<br/>
<br/>

## 小程序链接

微信搜索：**大粪助手**<br/>
![](https://cloud1-1gbei9qk7777fe06-1309430445.tcloudbaseapp.com/image/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E6%A0%87%E5%87%86%E8%89%B2%E7%89%88.png?sign=2617eab636a2ac843f14c8667e6ca46e&t=1647359365)
