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
                        name: "company",
                        label: "公司名称",
                        id: "contact-company",
                        width: 350
                    },
                    {
                        view: "text",
                        name: "contact",
                        label: "联系人",
                        id: "contact_contact",
                        options: ["Shipping A", "Shipping B", "Shipping C", "Shipping D", "Shipping E", "Shipping F", "Shipping G"]
                    },
                    {
                        view: "datepicker",
                        label: "contact Date",
                        value: new Date(),
                        format: "%d  %M %Y"
                    },
                    {
                        margin: 10,
                        cols: [{},
                            {
                                view: "button",
                                label: "Add",
                                type: "form",
                                align: "center",
                                width: 120,
                                click: function() {
                                    webix.ajax().post("/api/contact",JSON.stringify($$("contact-form").getValues()));
                                    //webix.$$("contact-win").close();
                                }
                            },
                            {
                                view: "button",
                                label: "Cancel",
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
