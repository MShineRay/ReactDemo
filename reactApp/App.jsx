import React from 'react';

class App extends React.Component {
    render() {
        return (
            <div>
                Hello World!!!<br />
                111111欢迎来到菜鸟教程学习！！！
            </div>
        );
    }
}

//如果想要组件可以在任何的应用中使用，
// 需要在创建后使用 export 将其导出，
// 在使用组件的文件使用 import 将其导入。
export default App;