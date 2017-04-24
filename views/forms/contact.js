define(function() {
    return {
        $ui: {
            view: "window",
            modal: true,
            id: "contact-win",
            position: "center",
            head: "Add new contact",
            body: {
                paddingY: 20,
                paddingX: 30,
                elementsConfig: {
                    labelWidth: 140
                },
                view: "form",
                id: "contact-form",
                elements: [{
                        view: "text",
                        name: "id",
                        label: "id",
                        id: "contact-id",
                        hidden:true,
                        width: 350
                    },{
                        view: "text",
                        name: "company",
                        label: "公司名称",
                        id: "contact-company",
                        width: 350
                    },
                    {
                        view: "text",
                        name: "contact",
                        label: "联系人",
                        id: "contact-contact",
                        width: 350
                    },
                    {
                        view: "text",
                        name: "phone",
                        label: "联系电话",
                        id: "contact-phone",
                        width: 350
                    },
                    {
                        view: "text",
                        name: "fhdz",
                        label: "发货地址",
                        id: "contact-fhdz",
                        width: 350
                    },
                    {
                        view: "datepicker",
                        name: "htzq",
                        label: "合同账期",
                        value: new Date(),
                        format: "%d  %M %Y"
                    },
                    {
                        view: "textarea",
                        name: "memo",
                        label: "备注",
                        id: "contact-memo",
                        width: 350
                    },
                    {
                        view: "text",
                        name: "rate",
                        label: "信誉等级",
                        id: "contact-rate",
                        width: 350
                    },
                    {
                        margin: 10,
                        cols: [{},
                            {
                                view: "button",
                                label: "保存",
                                type: "form",
                                align: "center",
                                width: 120,
                                click: function() {
                                	if($$("contact-form").getValues().id == ''){
                                		webix.ajax().post("/api/contact",JSON.stringify($$("contact-form").getValues()));
                                	}else{
                                		webix.ajax().put("/api/contact",JSON.stringify($$("contact-form").getValues()));
                                	}                                    
                                    webix.$$("DataTable").load("/api/contact");
                                    webix.$$("contact-win").close();
                                }
                            },
                            {
                                view: "button",
                                label: "取消",
                                align: "center",
                                width: 120,
                                click: function() {
                                    webix.$$("contact-win").close();
                                }
                            }
                        ]
                    }

                ]
            }
        }
    };
});
