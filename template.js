const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const todoss = {
    home: [
        {   
            id: uid(),
            checked: false,
            dueDate: "2025-04-30",
            description: "with colgate  asdjasdhasd djsahdjas d sdjas jd kasdh as d hasskdhsakjhd ahkdkhaslhdshadhas djha jksdha kshdjah sdkh",
            title: "brush teeth",
            priority: "low",
            project: "home"
        },
        {
            id: uid(),
            checked: true,
            dueDate: "2025-05-30",
            description: "eat banananananna",
            title: "breakfasst",
            priority: "high",
            project: "home"
        }
    ],
    today: [
        {
            id: uid(),
            checked: false,
            dueDate: "2025-04-30",
            description: "with banana",
            title: "code 1000 lines",
            priority: "medium",
            project: "today"
        },
        {
            id: uid(),
            checked: false,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        },
        {
            id: uid(),
            checked: false,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        }
    ],
    week: [
        {
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        }
    ],
    first: [
        {
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        },
        {
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        },
    ],
    second: [
        {
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush tasdasdeeth",
            priority: "low",
            project: "today"
        },
        {
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        },
        {
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        },
    ],
    firsat: [
        {
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        },
        {
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        },
    ],
    fisrst: [
        {
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        },
        {
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        },
    ],
    firdst: [
        {
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        },
        {   
            id: uid(),
            checked: true,
            dueDate: "2025-04-30",
            description: "with colgate",
            title: "brush teeth",
            priority: "low",
            project: "today"
        },
    ],   
}

const notess = [
    {
        id: uid(),
        title: "lol",
        description: "hahahahhahah",
    },
    {
        id: uid(),
        title: "brushed my teeth asasdas asdasdasdasd asadsa",
        description: "felt good\n asdasddd a sda d adsd \n sajdhaksdsh",
    },
    {
        id: uid(),
        title: "tried to poo",
        description: "felt bad",
    },
    {
        id: uid(),
        title: "lol",
        description: "hahahahhahah",
    },
    {
        id: uid(),
        title: "brushed my teeth asasdas asdasdasdasd asadsa",
        description: "felt good\n asdasddd a sda d adsd \n sajdhaksdsh",
    },
    {
        id: uid(),
        title: "tried to poo",
        description: "felt bad",
    }
]

export {todoss, notess};