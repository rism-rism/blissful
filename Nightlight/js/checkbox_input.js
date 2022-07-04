/*
 *  Ex Table Filter 0.5 - jQuery Plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog
 *		http://www.cyokodog.net/
 *		http://d.hatena.ne.jp/cyokodog/)
 *		http://cyokodog.tumblr.com/
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
;(function($){
	var f = $.regexp = function(option){
	if(!(this instanceof f)) return new f(option);
	var o = this,c = o.config = $.extend({},f.defaults,option);
	};
	$.extend(f,$.extend(f.prototype,{
	_getInstance : function(target){
		return target instanceof f ? target : f()
	},
	escapeSource : function(source){
		var o = f._getInstance(this),c = o.config;
		$.each(c.esc_str.split(','),function(){
			var esc_s = '\\' + this;
			source = source.replace(new RegExp(esc_s,'g'),esc_s);
		});
		return source;
	},
	wildcardMatchEscapeSource : function(source){
		var o = f._getInstance(this), c = o.config;
		return o.escapeSource(source).replace(/\\\*/g,'.*');
	}
	}));
	f.defaults = {
		esc_str : '\\,^,$,*,+,?,.,(,),|,{,},[,]'
	};
})(jQuery);

;(function($){

	// Namespace
	$.ex = $.ex || {};

	// Constructor
	var plugin = $.ex.tableFilter = function(target, option){
		var o = this,
		c = o.config = $.extend(true,{}, $.ex.tableFilter.defaults, option, o.getDataParam());
		plugin.status.applyCnt ++;
		c.target = target.eq(0);
		c._filters = {};
		o.setFilters(c.filters,{autoFilter:false});
		!c.autoFilter || o.filtering();
		c.callback.apply(o,[o]);
	}

	// API
	$.extend($.ex.tableFilter.prototype, {

		// 繝励Λ繧ｰ繧､繝ｳ驕ｩ逕ｨ隕∫ｴ�縺ｮ迢ｬ閾ｪ繝��繧ｿ螻樊ｧ(data-ex-table-filter)繧貞叙蠕励☆繧�
		getDataParam : function(){
			try{eval('return ' + this.config.target.attr('data-' + plugin.id));}catch(e){return {};}
		},

		// 繝励Λ繧ｰ繧､繝ｳ驕ｩ逕ｨ隕∫ｴ�繧貞叙蠕励☆繧�
		getTarget : function(){
			return this.config.target;
		},

		// 繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ荳ｭ縺ｮ繝輔ぅ繝ｫ繧ｿ繧貞叙蠕励☆繧�
		getCurrentFilter : function(){
			return this.config._currentFilter;
		},

		// 繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ荳ｭ縺ｮ繝輔ぅ繝ｫ繧ｿ縺ｮ蛟､繧貞叙蠕励☆繧�
		getCurrentFilterVal : function(){
			var o = this, c = o.config;
			var el = o.getCurrentFilter().element;
			if(!el) return undefined;
			if(/^radio|checkbox$/.test(el.prop('type'))){
				var el = el.filter(':checked');
				if(el.prop('type') == 'checkbox'){
					var ret = [];
					el.each(function(){
						ret.push($(this).val());
					});
					return ret;
				}
			}
			return el.val();
		},

		// 繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ荳ｭ縺ｮ繝輔ぅ繝ｫ繧ｿ縺ｮ蛟､繧呈焚蛟､螟画鋤縺励※蜿門ｾ励☆繧�
		getCurrentFilterNum : function(){
			var o = this, c = o.config;
			return o.getCurrentFilterVal.apply(o,arguments) - 0;
		},

		// 繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ荳ｭ縺ｮ TR 隕∫ｴ�繧貞叙蠕励☆繧�
		getCurrentRow : function(){
			return this.config._row;
		},

		// 繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ荳ｭ縺ｮ TH/TD 隕∫ｴ�繧貞叙蠕励☆繧�
		getCurrentCell : function(index){
			var o = this, c = o.config;
			if(!arguments.length) return c._col;
			return o.getCurrentRow().find('> *').eq(index);
		},

		// 繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ荳ｭ縺ｮ TH/TD 隕∫ｴ�縺ｮ蛟､繧貞叙蠕励☆繧�
		getCurrentCellVal : function(index){
			var o = this, c = o.config;
			return o.getCurrentCell.apply(o,arguments).text();
		},

		// 繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ荳ｭ縺ｮ TH/TD 隕∫ｴ�縺ｮ蛟､繧呈焚蛟､螟画鋤縺励※蜿門ｾ励☆繧�
		getCurrentCellNum : function(index){
			var o = this, c = o.config;
			return o.getCurrentCellVal.apply(o,arguments) - 0;
		},

		// 繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ荳ｭ縺ｮ陦後�陦ｨ遉ｺ迥ｶ諷九ｒ蜿門ｾ励☆繧�
		isShowCurrentRow : function(){
			return this.config._show;
		},

		// 蜷�き繝ｩ繝�縺ｮ繝輔ぅ繝ｫ繧ｿ譚｡莉ｶ繧帝�蛻怜処縺ｯ JSON 蠖｢蠑上〒縺ｾ縺ｨ繧√※險ｭ螳壹☆繧�
		setFilters : function(filters, config){
			var o = this, c = $.extend({},o.config,config);
			var appends = null;
			$.each(filters, function(index){
				var filter = c._filters[index] = filters[index];
			});
			o._generateFilter();
			$.each(c._filters, function(index){
				o.setFilter(index, c._filters[index], config);
			});
			return o;
		},

		// 迚ｹ螳壹�繧ｫ繝ｩ繝�縺ｮ繝輔ぅ繝ｫ繧ｿ譚｡莉ｶ繧定ｨｭ螳壹☆繧�
		setFilter : function(index, filter, config){
			var o = this, c = $.extend({},o.config,config);
			if(filter instanceof RegExp){
			}
			else
			if(filter instanceof Function){
			}
			else{
				var element;
				var getDefaultParam = function(element){
					return /^radio|checkbox$/.test(element.prop('type')) ||
						element.prop('tagName') == 'SELECT' ?
							c.selectElementFilter :
							c.elementFilter;
				}
				if(!(filter instanceof jQuery) && typeof filter == 'object'){
					if(filter.element) {
						element = $(filter.element);
						filter = $.extend({},getDefaultParam(element),filter);
					}
				}
				else{
					element = $(filter);
					filter = $.extend({},getDefaultParam(element));
				}
				if(element) {
					filter.element = element;
					if(c.autoBindFilter){
						filter.element.on(c.elementAutoBindTrigger,function(){
							if(c._triggerTimer) clearTimeout(c._triggerTimer);
							c._triggerTimer = setTimeout(function(){
								o.filtering();
							},c.elementAutoBindFilterDelay);
						});
					}
				}
			}
			c._filters[index] = filter;
			if(c.autoFilter) o.filtering();
			return o;
		},


		// 繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ繧貞ｮ溯｡後☆繧�
		filtering : function(){
			var o = this, c = o.config;
			c._rows = c.target.find('> tbody > tr');

			c.onFilteringStart.apply(o,[o]);
			c._rows.each(function(rowno){
				if(rowno >= c.startDataRowNo){
					$.each(c._filters, function(index){
						o._setFilterStatus(c._filters[index], '_show', false);
					});
					c._row = c._rows.eq(rowno).show();
					c._show = true;
					c._cols = c._row.find('> *');
					c._cols.each(function(colno){
						c._col = c._cols.eq(colno);
						var filter = c._currentFilter = c._filters[colno];
						if(filter != undefined){
							o._setFilterStatus(filter, '_show', o._getFilterStatus(filter, '_show') || !!o._filtering(filter));
						}
					});
					$.each(c._filters, function(index){
						if(!o._getFilterStatus(c._filters[index], '_show')) c._show = false;
					});
					var ret = c.onFiltering.apply(o,[o]);
					if(ret != undefined){
						c._show = !!ret;
					}
					if(!c._show){
						c._row.hide();
					}
				}
			});
			c.onFilteringEnd.apply(o,[o]);
			return o;
		},

		// 繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ縺ｮ繝｡繧､繝ｳ蜃ｦ逅�
		_filtering : function(filter){
			var o = this, c = o.config;
			var result = true;
			if(typeof filter == 'boolean') {
				result = filter;
			}
			else
			if(filter instanceof Function){
				var ret = filter.apply(o,[o]);
				if(ret != undefined) {
					result = o._filtering(ret);
				}
			}
			else
			if(filter instanceof RegExp){
				if(!filter.test(o.getCurrentCellVal())){
					result = false;
				}
			}
			else
			if(filter.queryStringMatch && filter.queryStringName){
				var getQSvalue = function(loc){
					var loc = loc || location;
					var q = loc.search.replace('?','').split('&');
					var ret = '';
					for(var i in q){
						var p = q[i].split('=');
						if(p[0] == filter.queryStringName) ret = p[1];
					}
					return ret;
				}
				var qs = getQSvalue();
				if(filter.element){
					$(filter.element).each(function(){
						if(getQSvalue(this) == qs) $(this).addClass('active')
					});
				}
				result = (!qs.length || o.getCurrentCellVal() == qs);
			}
			else
			if(filter.element && filter.element instanceof jQuery){
				var ret = filter.onFiltering.apply(o,[o]);
				if(ret != undefined) {
					result = o._filtering(ret);
				}
				else{
					var v;
					if(filter.element.prop('tagName') == 'SELECT'){
						v = filter.element.find('option:selected')[filter.selectValueMatch ? 'val' : 'text']();
					}
					else
					if(filter.element.prop('type') == 'radio'){
						v = filter.element.filter(':checked').val();
					}
					else
					if(filter.element.prop('type') == 'checkbox'){
						v = [];
						filter.element.filter(':checked').each(function(){
							v.push($(this).val());
						});
						if(!v.length) v = '';
					}
					else{
						v = filter.element.val();
					}
					if(v){
						if(v instanceof Array){
							for(var i = 0;i < v.length; i++){
								v[i] = o._makeFilterSrc(filter,v[i]);
							}
							v = v.join('|');
						}
						else{
							v = o._makeFilterSrc(filter,v);
						}
						var reg = filter.matchSwitch ?
							new RegExp(v,filter.matchSwitch) : new RegExp(v);
						result = reg.test(o.getCurrentCellVal());
					}
				}
			}
			else{
				result = !!filter;
			}
			return result;
		},

		// 繝代Λ繝｡繝ｼ繧ｿ縺ｫ蠕薙▲縺溘ヵ繧｣繝ｫ繧ｿ譚｡莉ｶ繧呈ｭ｣隕剰｡ｨ迴ｾ蠖｢蠑上〒逕滓�
		_makeFilterSrc : function(filter,src){
			src = filter.wildcardMatch ?
				$.regexp.wildcardMatchEscapeSource(src) :
				$.regexp.escapeSource(src);
			if(filter.firstMatch || filter.wildcardMatch || filter.fullMatch) src = '^' + src;
			if(filter.lastMatch || filter.wildcardMatch || filter.fullMatch) src = src + '$';
			return src;
		},

		// 繝輔ぅ繝ｫ繧ｿ繝ｼ縺ｫ繧ｹ繝��繧ｿ繧ｹ繧定ｨｭ螳�
		_setFilterStatus : function(filter, name, val){
			var element = filter.element;
			if(element && element.length){
				element.data(name, val);
			}
			filter[name] = val;
		},

		// 繝輔ぅ繝ｫ繧ｿ繝ｼ縺ｮ繧ｹ繝��繧ｿ繧ｹ繧貞叙蠕�
		_getFilterStatus : function(filter, name){
			var element = filter.element;
			if(element && element.length){
				return element.data(name);
			}
			return filter[name];
		},

		// 繝輔ぅ繝ｫ繧ｿ蜈･蜉帙ヵ繧｣繝ｼ繝ｫ繝峨ｒ閾ｪ蜍慕函謌舌☆繧�
		_generateFilter : function(){
			var o = this, c = o.config;
			var appends = null;
			$.each(c._filters, function(index){
				var filter = c._filters[index];
				if(!(filter instanceof jQuery) && typeof filter == 'object'){
					var append = filter.append;
					if(append && append.to && append.type){
						appends = appends || {};
						appends[index] = append;
					}
				}
			});
			if(!appends) return o;
			for(k=0;k<10;k++){
				var append = appends[k];
				if(typeof append !== "undefined"){
					//v = $("body").find(append.cls).text();
					v = $("body").find(append.cls);
					if(v.length){
						for(m=0;m<v.length;m++){
							//w = v[m].innerText;
							w = v[m].innerHTML;
							y = v[m].lastChild.className;
							append.values = append.values || {};
							append.values[w] = w;
							append.values2 = append.values2 || {};
							append.values2[w] = y;
							if(!isNaN(v)) append.numCnt = (append.numCnt || 0) + 1;
							append.valCnt = (append.valCnt || 0) + 1;
						}
					}
				}
			}
			$.each(appends, function(i){
				var append = appends[i];
				var appendFilter = c.appendFilter[append.type];
				append = $.extend(true, {}, appendFilter, append);
				append.to = $(append.to);
				append.isNumValues = (append.numCnt == append.valCnt);
				if(append.to.length && append.values){
					var arr = [];
					$.each(append.values, function(v){
						arr.push(v);
					});
					!append.isNumValues ? arr.sort() : arr.sort(function(a, b){
						return (parseInt(a) > parseInt(b)) ? 1 : -1;
					});
					if(/^(checkbox|radio)$/.test(append.type)){
						var element = [];
						var add = function(label, value){
							var wrap = $(append.template.replace(/{label}/ig, label)).appendTo(append.to);
							var el = wrap.prop('type') == append.type ? wrap : wrap.find('input:' + append.type);
							if(append.type == 'radio') el.prop('name', 'radio-filter-' + plugin.status.applyCnt);
							if(append.type == 'checkbox') el.prop('name', append.cls.replace(".",""));
							element.push(el.val(value)[0]);
						}
						$.each(arr, function(j){
							var v = arr[j];
							var v2 = append.values2[v];
							if(j == 0 && append.addBlank) add(append.blankLabel, append.blankValue)
							add(v, v2);
						});
						if(element.length){
							c._filters[i].element = $(element);
						}
					}
					else
					if(append.type == 'select'){
						var element = $(append.template).appendTo(append.to);
						var add = function(label, value) {
							$('<option/>').val(value).text(label).appendTo(element);
						}
						if(append.addBlank) add(append.blankLabel, append.blankValue);
						$.each(arr, function(j){
							var v = arr[j];
							add(v, v);
						});
						c._filters[i].element = element;
					}
					else
					if(append.type == 'text'){
						c._filters[i].element = $(append.template).appendTo(append.to);
					}
				}
			});
		}
	});

	// Setting
	$.extend($.ex.tableFilter,{
		status : {
			applyCnt : 0
		},
		defaults : {
			api : false,	// true 縺ｮ蝣ｴ蜷� api 繧ｪ繝悶ず繧ｧ繧ｯ繝医ｒ霑斐☆
			filters : [],	// 蜷�き繝ｩ繝�縺ｮ繝輔ぅ繝ｫ繧ｿ譚｡莉ｶ繧帝�蛻怜処縺ｯ JSON 蠖｢蠑上〒縺ｾ縺ｨ繧√※謖�ｮ�
			autoFilter : true,	//	繝励Λ繧ｰ繧､繝ｳ驕ｩ逕ｨ蠕後�繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ縺ｮ閾ｪ蜍募ｮ溯｡後�驕ｩ逕ｨ
			autoBindFilter : true,	//	繝医Μ繧ｬ繝ｼ縺ｮ閾ｪ蜍募牡繧雁ｽ薙※縺ｮ驕ｩ逕ｨ
			elementAutoBindTrigger : 'keydown change',	//	閾ｪ蜍募牡繧雁ｽ薙※縺吶ｋ繝医Μ繧ｬ繝ｼ縺ｮ謖�ｮ�
			elementAutoBindFilterDelay : 300,	//	繝輔ぅ繝ｫ繧ｿ繝医Μ繧ｬ繝ｼ襍ｷ蜍墓凾縺ｮ繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ螳溯｡碁俣髫斐�謖�ｮ�
			startDataRowNo : 0,	//	繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ髢句ｧ玖｡後�謖�ｮ�
			callback : function(api){},	//	繝励Λ繧ｰ繧､繝ｳ驕ｩ逕ｨ蠕後�繧ｳ繝ｼ繝ｫ繝舌ャ繧ｯ蜃ｦ逅��謖�ｮ�
			onFilteringStart : function(api){},	//	繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ髢句ｧ区凾縺ｮ繧ｳ繝ｼ繝ｫ繝舌ャ繧ｯ蜃ｦ逅��謖�ｮ�
			onFiltering : function(api){},	//	蜷�｡後�繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ蠕後�繧ｳ繝ｼ繝ｫ繝舌ャ繧ｯ蜃ｦ逅��謖�ｮ�
			onFilteringEnd : function(api){},	//	繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ邨ゆｺ�凾縺ｮ繧ｳ繝ｼ繝ｫ繝舌ャ繧ｯ蜃ｦ逅��謖�ｮ�
			elementFilter : {	//	input:text 隕∫ｴ�縺ｧ繝輔ぅ繝ｫ繧ｿ縺吶ｋ蝣ｴ蜷医�繝�ヵ繧ｩ繝ｫ繝郁ｨｭ螳�
				element : '',	//	繝輔ぅ繝ｫ繧ｿ譚｡莉ｶ縺ｮ蜈･蜉帙ヵ繧｣繝ｼ繝ｫ繝峨ｒ謖�ｮ�
				firstMatch : false,	//	蜑肴婿荳閾ｴ繝輔ぅ繝ｫ繧ｿ縺ｮ驕ｩ逕ｨ
				lastMatch : false,	//	蠕梧婿荳閾ｴ繝輔ぅ繝ｫ繧ｿ縺ｮ驕ｩ逕ｨ
				fullMatch : false,	//	螳悟�荳閾ｴ繝輔ぅ繝ｫ繧ｿ縺ｮ驕ｩ逕ｨ
				wildcardMatch : false,	//	繝ｯ繧､繝ｫ繝峨き繝ｼ繝峨ヵ繧｣繝ｫ繧ｿ縺ｮ驕ｩ逕ｨ
				matchSwitch : 'ig',	// 豁｣隕剰｡ｨ迴ｾ繝輔ぅ繝ｫ繧ｿ縺ｮ繧ｹ繧､繝�メ繧呈欠螳�
				queryStringMatch : false, // QueryString 縺ｮ蛟､縺ｧ繝輔ぅ繝ｫ繧ｿ繝ｪ繝ｳ繧ｰ
				queryStringName : '', // queryStringMatch 縺� true 譎ゅ↓辣ｧ蜷医☆繧九ヱ繝ｩ繝｡繝ｼ繧ｿ蜷阪ｒ謖�ｮ�
				onFiltering : function(api){}
			},
			selectElementFilter : {	//	select,radio,checkbox 隕∫ｴ�縺ｧ繝輔ぅ繝ｫ繧ｿ縺吶ｋ蝣ｴ蜷医�繝�ヵ繧ｩ繝ｫ繝郁ｨｭ螳�
				selectValueMatch : false,	//	select 隕∫ｴ�縺ｧ繝輔ぅ繝ｫ繧ｿ縺吶ｋ蝣ｴ蜷医� value 螻樊ｧ縺ｧ荳閾ｴ蛻､螳壹☆繧�
				element : '',	//	elementFilter縺ｨ蜷梧ｧ�
				firstMatch : false,	//	elementFilter縺ｨ蜷梧ｧ�
				lastMatch : false,	//	elementFilter縺ｨ蜷梧ｧ�
				fullMatch : true,	//	螳悟�荳閾ｴ繝輔ぅ繝ｫ繧ｿ縺ｮ驕ｩ逕ｨ
				wildcardMatch : false,	//	elementFilter縺ｨ蜷梧ｧ�
				matchSwitch : '',	//	elementFilter縺ｨ蜷梧ｧ�
				onFiltering : function(api){}
			},
			appendFilter : {
				to : '',
				type : '',
				cls : '',
				'text' : {
					template : '<input class="form-control" type="text"/>'
				},
				'checkbox' : {
					template : '<div class="checkbox"><label><input type="checkbox"/><span class="checkbtn">{label}</span></label></div>'
				},
				'radio' : {
					addBlank : true,
					blankLabel : 'all',
					blankValue : '',
					template : '<div class="radio"><label><input type="radio""/>{label}</label></div>'
				},
				'select' : {
					addBlank : true,
					blankLabel : '',
					blankValue : '',
					template : '<select class="form-control"/>'
				}
			},
			filterFieldTemplate : '<div><label>FILTER:</label><input type="text" class="form-control"/></div>'
		},
		version : '0.5',
		id : 'ex-table-filter'
	});

	// jQuery Method
	$.fn.exTableFilter = function(option, option2){
		var targets = this, api = [];
		var makeFilter = function(option){
			option = $.extend({}, plugin.defaults, option);
			return $(option.filterFieldTemplate).insertBefore(targets.eq(0)).find('input');
		}
		var makeFilters = function(filter, option){
			filter = filter || makeFilter(option);
			option = option || {};
			var arr = [];
			targets.eq(0).find('> tbody > tr:eq(0) > *').each(function(i){
				var sts = true
				if(option.ignore){
					var ignore = option.ignore.split(',');
					$.each(ignore, function(j){
						if(i == ignore[j]) sts = false;
					});
				}
				if(sts) arr[i] = filter;
			});
			if(!arr.length) return option;
			return $.extend(option, {filters : arr});
		}
		if(!arguments.length){
			option = makeFilters();
		}
		else{
			if(option instanceof Array){
				option = $.extend({}, (option2 || {}), {filters : option});
			}
			else
			if(option instanceof jQuery || typeof option == 'string'){
				option = makeFilters(option, option2);
			}
			else
			if(typeof option == 'object'){
				if(!option.filters){
					option = makeFilters(null, option);
				}
			}
		}
		targets.each(function(index) {
			var target = targets.eq(index);
			var obj = target.data(plugin.id) ||
				new $.ex.tableFilter(target, $.extend({}, option, {'targets': targets, 'index': index}));
			api.push(obj);
			target.data(plugin.id, obj);
		});
		return option && option.api ? ($.ex.api ? $.ex.api(api) : api.length > 1 ? api : api[0]) : targets;
	}

})(jQuery);

$(function() {
	$(document).on('change', '.serchBox select, .serchBox input[type=checkbox]', function() {
		filter_list();
	});

	var count=$('div.item').filter(':visible').length;
//	document.getElementById("kensu").innerHTML = count;

	// 繝ｪ繧ｹ繝医ｒ邨槭ｊ霎ｼ繧髢｢謨ｰ
	function filter_list() {
		$("#result").removeClass("over");
		var lists = $('div.item');
		var count;
		lists.show();
		// select縺ｮ邨槭ｊ霎ｼ縺ｿ
		for (var i = 0; i < $('.serchBox select').length; i++) {
			// 邨槭ｊ霎ｼ縺ｿ縺ｮ鬆�岼繧貞叙蠕�
			var item = $('.serchBox select').eq(i).attr('name');
			// 邨槭ｊ霎ｼ縺ｿ縺ｮ蟇ｾ雎｡繧貞叙蠕�
			var target = $('.serchBox select').eq(i).val();

			if(target != '') {
				for (var j = 0; j < lists.length; j++) {
					// 邨槭ｊ霎ｼ縺ｿ蟇ｾ雎｡縺ｧ縺ｪ縺��ｴ蜷医�髱櫁｡ｨ遉ｺ
					if(!lists.eq(j).find('.' + item).find('span').hasClass(target)) {
						lists.eq(j).hide();
					}
				};
			}
		}
		// checkbox縺ｮ邨槭ｊ霎ｼ縺ｿ
		for (var i = 0; i < $('.serchBox .checkboxArea').length; i++) {
			// 邨槭ｊ霎ｼ縺ｿ縺ｮ鬆�岼繧貞叙蠕�
			var item = $('.serchBox .checkboxArea').eq(i).find('input:checkbox').attr('name');
			// 邨槭ｊ霎ｼ縺ｿ縺ｮ蟇ｾ雎｡繧貞叙蠕�
			var target = [];
			$('[name=' + item + ']:checked').each(function() {
				target.push($(this).val());
			});

			if(target.length) {
				for (var j = 0; j < lists.length; j++) {
					// 邨槭ｊ霎ｼ縺ｿ蟇ｾ雎｡縺九←縺�°繧定ｪｿ縺ｹ繧�
					var showCheck = false;
					for (var k = 0; k < target.length; k++) {
						if(lists.eq(j).find('.' + item).find('span').hasClass(target[k])) {
							showCheck = true;
						}
					}
					// 邨槭ｊ霎ｼ縺ｿ蟇ｾ雎｡縺ｧ縺ｪ縺��ｴ蜷医�髱櫁｡ｨ遉ｺ
					if(!showCheck) {
						lists.eq(j).hide();
					}
				};

			}
		}

		var count=$('div.item').filter(':visible').length;
		document.getElementById("kensu").innerHTML = count;
	}
});

function checkbox_reset() {
	for (var i = 0; i < $('.serchBox .checkboxArea').length; i++) {
			// 邨槭ｊ霎ｼ縺ｿ縺ｮ鬆�岼繧貞叙蠕�
			var item = $('.serchBox .checkboxArea').eq(i).find('input:checkbox:checked');

			for(var j = 0; j < item.length; j++){
				item[j].checked = false;
			}
	}
	$('div.item').show();
	var count=$('div.item').filter(':visible').length;
	document.getElementById("kensu").innerHTML = count;
}

function hidden_click() {
	$("#result").removeClass("over");
}
