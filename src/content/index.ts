//收藏类型
export const COLLECT_TYPE = [
    {
        key: 0,
        label: '全部',
        type: 'all',
    },
    {
        key: 1,
        label: 'ChatGPT',
        type: 'chat'
    },
    {
        key: 2,
        label: '问答列表',
        type:'system'
    },
    {
        key: 3,
        label: '自定义',
        type: 'self'
    }
];

//对话数据结构
export const CHAT = [    //id query,其他body
    {
        id: 1,     //参数
        title: '什么是基本概念',
        history: [      //参数
            {
                id: 1,
                question: '11111',  
                answer: '11111',    
                collect: false,
            },
            {
                id: 2,
                question: '22222',
                answer: '22222',
                collect: false,
            }
        ]
    },
    {
        id: 2,
        title: '面向对象编程思想',
        history: [
            {
                id: 3,
                question: '33333',
                answer: '33333',
                collect: false,
            }
        ]
    }
]



//取消收藏位置类型
export const COLLECT_LOCATION = {
    QUESTION_LIST: 'system',   //问题列表
    MULT_CHAT: 'chat',  //多轮GPT
    ONE_CHAT: 'oneShot',  //单轮问答
}
