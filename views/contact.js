define([
	"views/forms/contact",
], function(orderform ){

	var controls = [
		{ view: "button", type: "iconButton", icon: "plus", label: "添加", width: 130, click: function(){
			this.$scope.ui(orderform.$ui).show();
		}},
    { view: "button", type: "iconButton", icon: "edit", label: "编辑", width: 130, click: function(){
      //todo
		}},
		{},
		{view:"richselect", id:"order_filter", value: "all", maxWidth: 400, minWidth: 250, vertical: true, labelWidth: 100, options:[
			{id:"all", value:"All"},
			{id:"new", value:"Need Invoicing"},
			{id:"ready", value:"Ready to Ship"},
			{id:"completed", value:"Completed"},
			{id:"cancelled", value:"Cancelled"}
		],  label:"Filter orders", on:{
			onChange:function(){
				var val = this.getValue();
				if(val=="all")
					$$("DataTable").filter("#status#","");
				else
					$$("DataTable").filter("#status#",val);
			}
		}
		}
	];

	var grid = {
		margin:10,
		rows:[
			{
				id:"DataTable",
				view:"datatable", select:true,
				columns:[
					{id:"id", header:"#", width:50},
					{id:"company", header:"公司名称", sort:"string", minWidth:150, fillspace:1},
					{id:"contact", header:"联系人", sort:"string", minWidth:150, fillspace:1},
					{id:"phone", header:"联系电话", sort:"string", width:90},
					{id:"fhdz", header:"发货地址", width:200, sort:"string"},
					{id:"htzq", header:"合同账期", width:120, sort:"string"},
					{id:"memo", header:"备注",sort:"string"},
					{id:"rate", header:"信誉等级", width:80, sort:"string" },
					{id:"trash", header:"&nbsp;", width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"}
				],
				on: {
					onAfterLoad: function(){
						//this.select(1);
					}
				},
				pager:"pagerA",
				url:"/api/user",
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"The selected will be deleted.<br/> Are you sure?", ok:"Yes", cancel:"Cancel",
							callback:function(res){
								if(res){
									webix.$$("DataTable").remove(id);
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
