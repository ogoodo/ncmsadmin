//参考google注释规范: http://alloyteam.github.io/JX/doc/specification/google-javascript.xml?showone=%E6%B3%A8%E9%87%8A#%E6%B3%A8%E9%87%8A


// js内置数据类型 Array、Boolean、Date、Function、Number Object 、String 等
/*
类的注释
@name ：类名称
@class ：类描述
@constructor ：表明这是一个构造函数，非常重要。
@extends	:类继承的父类。
@type	：数据的类型，主要用来注释属性。
@default	：默认值，主要用来注释属性。
@abstract 标明一个成员是抽象的，需要子类去实现。
@public、@protected、@private：类、方法或属性的访问权限


其他常用注释
@example	: 示例代码。
@enum [<type>]	: 一组同样类型的静态属性集合。switch 语句中的分支应该只使用枚举。
@overview	：对当前代码文件的描述。
@copyright	：代码的版权信息。
@author <name> [<emailAddress>]	：代码的作者信息。
@version	：当前代码的版本。


JSDoc 3 标签规范
标签	描述
@abstract/@virtual	This member must be implemented (or overridden) by the inheritor.
@access	Specify the access level of this member - private, public, or protected.
@alias	Treat a member as if it had a different name.
@augments/@extends	标明一个函数继承另一个函数，如 A 继承 B 则可以在 A 的注释中加 `@augments B`
@author	Identify the author of an item.
@borrows	参考，如 A 和 B 两个函数意义相同，则可以在 B 的注释中加 `@borrows A as B`，而不需重复添加注释
@callback/@typedef	标明此方法是一个回调函数
@classdesc	对一个类的描述
@constant/@const	常量标识
@constructor/@class	标明是构造器函数，可使用 `new` 关键字实例化
@constructs	当使用对象字面量形式定义类时，可使用此标签标明其构造函数
@copyright	描述版权信息
@default	默认值
@deprecated	弃用
@desc/@description	如果在注释开始描述可省略此标签
@enum	一个类中属性的类型相同时，使用此标签标明
@event	标明一个可触发的事件函数，一个典型的事件是由对象定义的一组属性来表示。
@example	示例，代码可自动高亮
@exports	标识此对象将会被导出到外部调用
@external/@host	标识此类、命名空间或模块来自外部
@file	描述文件功能
@fires/@emits	标明当一个方法被调用时将出发一个特殊类型的事件
@global	全局变量标识
@ignore	忽略此注释块
@inner	标明此代码是父类的内部变量
@instance	标明此代码是父类的实例
@kind	标明代码在其文档中的类型，如Class、Modual等
@license	采用的开源协议版本
@link	内联标签，创建一个链接，如 `{@link http://github.com Github}`
@member/@var	记录一个基本数据类型的成员变量
@memberof	指定一个变量所属的父类
@method/@function/@func	标记一个方法或函数
@mixes	标记一个对象混合了另一个对象的所有成员
@mixin	一个 `mixin` 提供了旨在将方法添加到对象上的功能
@module	标明当前文件模块，在这个文件中的所有成员将被默认为属于此模块，除非另外标明
@name	指定一段代码的名称，强制 JSDoc 使用此名称，而不是代码里的名称
@namespace	指定一个变量为命名空间变量
@param	标记方法参数及参数类型
@private/@protected/@public	标明变量访问等级
@property	标明一个对象的属性
@readonly	只读
@requires	标明运行代码所需模块
@returns/@return	标明返回值、类型及描述
@see	链接到一个参考位置
@since	描述此功能来自哪一版本
@static	描述一个不需实例即可使用的变量
@summary	对描述信息的短的概述
@this	说明 `this` 关键字所代表的意义
@throws	描述方法将会出现的错误和异常
@todo	描述函数的功能或任务
@tutorial	插入一个指向向导教程的链接
@type	描述代码变量的类型
@version	版本信息


Google 不推荐使用下列的 tag：
@argument(不推荐) => @param
@link(不推荐) => @see
@augments Indicate this class uses another class as its "base."
@borrows 注明把另一个类的成员当成该类的成员
@class 和 @constructor 类似，但是允许后面跟上类的描述，而后者只是标明函数是一个构造函数，介绍是单独出来的
@constant 常亮
@constructs
@default 指明变量的默认值
@event 标示具有相同名字的事件触发时，该函数会被调用
@example 使用举例，=> @description
@field 标示一个对象为非函数，即使它是一个函数
@function 标示一个对象为函数，（因为使用函数返回一个对象时，无法区分是对象还是函数）
@ignore 让 jsDoc 忽略该变量
@inner 类似于@private，是一个函数内部定义的函数
@memberOf 标示一个变量引用了一个类的成员
@name 强制覆盖 name 属性
@namespace
@property
@public
@requires
@returns
@since
@static
@version
*/
/**
* 函数注释的示例。
* @param {Integer} augend 被加数。
* @param {Integer} addend 加数。
* @return {Integer} 两数之和。
* @example
* add(1, 2) => 3
*/
function addFunc(augend, addend){
	return augend + addend;
}

/**
* @name SampleCls
* @class 类描叙
* @public
* @constructor
*/
function SampleCls(){
	this.something = [];
}
SampleCls.prototype = 
/** @lends SampleCls.prototype*/
{
	/**
	* 属性示例。
	* @private
	* @type {Array}
	* @default []
	*/
	something : [],

	/**
	* 方法示例。
	* @public
	* @param {String} arg 跟踪方法插件。
	*/
	doSomething: function(arg){
	}
}


/**
 * Class representing a dot.
 * @extends Point
 */
class Dot extends Point {
    /**
     * Create a dot.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} width - The width of the dot, in pixels.
     */
    constructor(x, y, width) {
    }

    /**
     * Get the dot's width.
     * @return {number} The dot's width, in pixels.
     */
    getWidth() {
    }
    
    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {string} str - The string containing two comma-separated numbers.
     * @return {Point} A Point object.
     */
    static fromString(str) {
    }
}


/**
 * @constructor
 * @augments Animal
 */
function Duck() {}
Duck.prototype = new Animal();
/** What do ducks say? */
Duck.prototype.speak = function() {
};


/**
 * @name Uploader
 * @class 异步文件上传组件，支持ajax、flash、iframe三种方案
 * @constructor
 * @extends Base
 * @requires UrlsInput
 * @requires IframeType
 * @requires AjaxType
 * @param {Object} config 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
 * @param {Button} config.button Button按钮的实例
 * @param {Queue}  config.queue Queue队列的实例
 * @param {String|Array} config.type 采用的上传方案
 * @param {Object} config.serverConfig 服务器端配置
 * @param {String} config.urlsInputName 存储文件路径的隐藏域的name名
 * @param {Boolean} config.isAllowUpload 是否允许上传文件
 * @param {Boolean} config.autoUpload 是否自动上传
 * @example
 * var uploader = new Uploader({button:button,queue:queue,serverConfig:{action:'test.php'}})
 */
function Uploader(config) { }
