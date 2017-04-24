define([
	"views/forms/contact",
], function(contactform ){

	var controls = [
		{ 　view: "button", type: "iconButton", icon: "plus", label: "添加", width: 130, click: function(){			
			this.$scope.ui(contactform.$ui).show();
		}},
    	{ 　view: "button", type: "iconButton", icon: "edit", label: "编辑", width: 130, click: function(){
			if ($$("DataTable").getSelectedId() == undefined)
				return;			
			var selectd=$$("DataTable").getSelectedId().row;			
			this.$scope.ui(contactform.$ui).show();
			$$("contact-form").setValues($$("DataTable").getSelectedItem());
		}},
		{ 　view: "button", type: "iconButton", icon: "refresh", label: "刷新", width: 130, click: function(){
      		$$("DataTable").load("/api/contact");
		}},
		{},
		{　view:"richselect", id:"filter", value: "all", maxWidth: 400, minWidth: 250, vertical: true, labelWidth: 100, options:[
			{id:"all", value:"All"}
		],  label:"筛选", on:{
			onChange:function(){
				var val = this.getValue();
				if(val=="all")
					$$("DataTable").filter("#status#","");
				else
					$$("DataTable").filter("#status#",val);
			}
		}}
	];

	var grid = {
		margin:10,
		rows:[
			{
				id:"DataTable",
				view:"datatable", select:true,resizeColumn:true,
				columns:[
					{id:"id", header:"#", width:50},
					{id:"company", header:"公司名称", sort:"string", minWidth:150,adjust:true, fillspace:1},
					{id:"contact", header:"联系人", sort:"string", minWidth:90,adjust:true, fillspace:1},
					{id:"phone", header:"联系电话", sort:"string", minWidth:90,adjust:true, fillspace:1},
					{id:"fhdz", header:"发货地址", width:200, sort:"string",adjust:true, fillspace:2},
					{id:"htzq", header:"合同账期", minWidth:120, sort:"string",adjust:true, fillspace:1},
					{id:"memo", header:"备注",sort:"string", fillspace:4},
					{id:"rate", header:"信誉等级", minWidth:80, sort:"string",adjust:true},					
					{id:"trash", header:"&nbsp;", width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"}
				],
				on: {
					onAfterLoad: function(){
						//this.select(1);						
					}
				},
				pager:"pagerA",
				url:"/api/contact",
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"The selected will be deleted.<br/> Are you sure?", ok:"Yes", cancel:"Cancel",
							callback:function(res){
								if(res){
									var promise = webix.ajax().del("/api/contact/" +id)
									promise.then(function success(realdata){
										webix.$$("DataTable").remove(id);
									}, function error(err){
										console.log(err)
									});
									
								}
							}
						});
					}
				}
			}
		]

	};

	var layout = {
		type: "space",
		rows:[
			{
				height:40,
				cols:controls
			},
			{
				rows:[
					grid,
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", id:"pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}

						]
					}
				]
			}
		]
	};

	return {
		$ui: layout		
	};

});
