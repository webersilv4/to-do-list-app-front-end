interface IDataUser {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    allTasks: [{
        date: string;
        tasks: [{
            title: string;
            description: string;
            hour: string;
            taskComplete: boolean;
            _id: string;
        }]
        _id: string;
    }]
}


interface IHandleTask {
    userId?: string;
    date?: string;
    title?: string;
    description?: string;
    hour?: string;
}