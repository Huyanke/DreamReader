// 开启调试日志
// 在应用开发阶段，你可以选择开启 SDK 的调试日志（debug log）来方便追踪问题。调试日志开启后，SDK 会把网络请求、错误消息等信息输出到 IDE 的日志窗口，或是浏览器 Console 或是 LeanCloud 控制台的 云引擎日志 中。
localStorage.setItem('debug', 'leancloud*')

var APP_ID = 'Kt131usI4o14Szj4YRCMswxQ-gzGzoHsz'
var APP_KEY = 'WdAF8z47j1wpUvkhIT8EN4dc'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

$(function () {

    $('#sendVcode').click(function () {
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber: $('#mobile').val(),
            op: '领取福利',
            ttl: 10,
        }).then(function () {
            alert('发送成功')
        }, function (err) {
            alert('发送失败')
        })
    })

    $('#submit').click(function () {
        AV.Cloud.verifySmsCode($('#vcode').val(), $('#mobile').val()).then(function () {
            alert('验证成功')
            var Mobile = AV.Object.extend('Mobile')
            var mobile = new Mobile()
            mobile.save({
                mobile: $('#mobile').val()
            }).then(function (object) {
                alert('保存用户手机成功')
            })
        }, function (err) {
            alert('验证失败')
        })
    })
})
