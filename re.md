###1. ctrl + \ 拆分并行编辑
###2. s + a +f 格式化
###3. router引用过来并注册使用:
###4. render????
###5. html快速写法  div.home class/ div#home id
###6. div>p 嵌套 
###7. vue动画效果配置
```text v-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
v-enter-active: 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。
v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
v-leave-active: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。
一般的使用方式是:
在html里面用transition包裹起来,然后建立一个name,这个name对应css的class名字的前缀,例如这里name是fade,class就是fade前缀命名
总的来说:在enter里面会代表状态从没有到有的变化,在leave里面会代表状态从有到没有的变化,在使用的时候可以按照需要使用,需要考虑好动画的变化再开始写代码
```
###8. 一种是js钩子的方式
###9. 弹层和css sticky footer原理
```text
css sticky footer解释:如果页面内容不够长的时候，页脚块粘贴在视窗底部；如果内容足够长时，页脚块会被内容向下推送。
```
###10. $refs的使用是vue操作dom的一种方式:ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例: