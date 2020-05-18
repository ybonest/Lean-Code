// 外部迭代器

function Iterator(obj) {
    let index = 0;

    function current() {
        return obj[index];
    }

    function next() {
        index += 1;
    }

    function isDone() {
        return index >= obj.length;
    }
    return {
        next,
        current,
        isDone
    }
}

const iterator1 = Iterator([1, 2, 3]);
const iterator2 = Iterator([1, 2, 3]);

function compare(iterator1, iterator2) {
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.current() !== iterator2.current()) {
            throw new Error('not equal');
        }
        iterator1.next();
        iterator2.next();
    }
}

// 上传文件之迭代器优化

var getUploadObj = function () {
    try {
        return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
    } catch (e) {
        if (supportFlash()) { // supportFlash 函数未提供
            var str = '<object type="application/x-shockwave-flash"></object>';
            return $(str).appendTo($('body'));
        } else {
            var str = '<input name="file" type="file"/>'; // 表单上传
            return $(str).appendTo($('body'));
        }
    }
};

// 上面trycatch+if的模式不利于阅读和扩展，使用迭代器改造
var getActiveUploadObj = function () {
    try {
        return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
    } catch (e) {
        return false;
    }
};
var getFlashUploadObj = function () {
    if (supportFlash()) { // supportFlash 函数未提供
        var str = '<object type="application/x-shockwave-flash"></object>';
        return $(str).appendTo($('body'));
    }
    return false;
};
var getFormUpladObj = function () {
    var str = '<input name="file" type="file" class="ui-file"/>'; // 表单上传
    return $(str).appendTo($('body'));
};

var iteratorUploadObj = function () {
    for (var i = 0, fn; fn = arguments[i++];) {
        var uploadObj = fn();
        if (uploadObj !== false) {
            return uploadObj;
        }
    }
};
var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUpladObj);