//问答列表数据类型
export const QUESTION_ANSWER_DATA = [
    {
        typeId: 1,
        type: '面向对象基础',
        qa: [
            {
                id: 1,
                question:'介绍什么是类和对象，如何创建和使用它们。',
                answer: '11111',
                isFavorite: false,
            },
            {
                id: 2,
                question: '讨论封装的概念和如何实现数据隐藏。',
                answer: '222222',
                isFavorite: true,
            }
        ]
    },
    {
        typeId: 2,
        type: '类设计和建模',
        qa: [
            {
                id:3,
                question: '介绍UML图表，如类图、时序图、用例图等，以用于类设计和建模。',
                answer: '333333',
                isFavorite: true,
            },
            {
                id: 4,
                question: '讨论类设计原则，如单一职责原则、开闭原则等。',
                answer: '444444',
                isFavorite: false,
            }
        ]
    }
]

//收藏列表，数据类型
export const COLLECT_DATA = [
    {
        id: 1,
        question: '介绍什么是类和对象，如何创建和使用它们。',
        answer: '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
        created_time: '2023-10-11 11:11',
    },
    {
        id: 2,
        question: '介绍什么是类和对象，如何创建和使用它们。',
        answer: '222222',
        created_time: '2023-10-11 11:11',
    },
    {
        id: 3,
        question: '介绍什么是类和对象',
        answer: '333333',
        created_time: '2023-10-11 11:11',
    }
]

//用户登录信息数据类型
export const COUNT = {
    password: '111111',
    username: 'name',
}