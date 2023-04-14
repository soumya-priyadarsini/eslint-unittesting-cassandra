const cassandraDb = require('../db/cassandra')

exports.bluckusers = (req,res) =>{
    return new Promise(async ()=>{
        const {data} = req.body
        console.log(data)
        for(let i = 0;i< data.length;i++){
        let addData = `INSERT INTO testing(id,name,email,age) VALUES (${data[i].id},'${data[i].name}','${data[i].email}',${data[i].age})`
        console.log(addData)
                await cassandraDb.execute(addData).then(async (newdata) => {
                    console.log('data inserted successfully')
                    return res.status(200).json({
                        success: true,
                        message: "data insert successfully",
                    })
                
                }).catch(err => {
                    return res.status(500).json({
                        success: false,
                        message: "ERROR_IN_INSERT_DATA"
                    })
                })
            }

    })
}


exports.createUser = (req, res) => {
    return new Promise(async () => {
        const { id, name, age } = req.body
        console.log(req.body)
        let namePresent = `SELECT * FROM curd_assign WHERE name='${name}' ALLOW FILTERING`
        //console.log(idPresent)
        await cassandraDb.execute(namePresent).then(async (user) => {
           // console.log(user)
            if (user.rowLength === 1) {
                console.log("name_Already_Exists")
                return res.status(500).json({
                    message: "name_Already_Exists"
                })
            } else {
                const addData = `INSERT INTO curd_assign(id,name,age,reqbody) VALUES (${id},'${name}',${age},'${JSON.stringify(req.body)}')`
                await cassandraDb.execute(addData).then(async (newdata) => {
                    const result = await cassandraDb.execute('SELECT * FROM curd_assign')
                    const { rows } = result
                    console.log('data inserted successfully')
                    return res.status(200).json({
                        success: true,
                        message: "data insert successfully",
                        Users: rows
                    })
                }).catch(err => {
                    return res.status(500).json({
                        success: false,
                        message: "ERROR_IN_INSERT_DATA"
                    })
                })

            }
        })


    })

}

exports.getSingle = (req,res) =>{
    return new Promise(async () =>{
        const {id} = req.body
        let idPresent = `SELECT * FROM curd_assign WHERE id=${id}`;
        await cassandraDb.execute(idPresent).then(async (userId) => {
            console.log("DB:-",userId.rows[0].reqbody)
            console.log('got single users')
            return res.status(200).json({
                message:"User Found Successfully",
                users:userId.rows
            })
        }).catch(err=>{
           // console.log('Users Not Found')
            return res.status(500).json({
                message:"USERS_NOT_FOUND"
            })
        })
    })
}

exports.updateUser = (req, res) => {
    return new Promise(async () => {
        const { name } = req.body
        const id = req.params.id
        // const checkId = await cassandraDb.execute('SELECT * FROM curd_assign')
        let idPresent = `SELECT * FROM curd_assign WHERE id=${id}`;
        await cassandraDb.execute(idPresent).then(async (userId) => {
            //console.log(userId.rowLength)
            //check id present or not
            if (userId.rowLength === 1) {
                const query = `UPDATE curd_assign SET name='${name}'
            WHERE id=${id};`
                await cassandraDb.execute(query)
                const result = await cassandraDb.execute('SELECT * FROM curd_assign')
                const { rows } = result
                console.log('updated successfully')
                return res.status(200).json({
                    message: "data updated successfully",
                    newData: rows
                })
            } else {
                console.log("ID_NOT_FOUND_IN_THE_DB")
                return res.status(500).json({
                    message: "ID_NOT_FOUND_IN_THE_DB"
                })
            }
        })
        //console.log(newId)
        // console.log(checkId.rows)


    })
}

exports.getAllUsers = (req,res)=>{
    return new Promise(async()=>{
        const query = 'SELECT * FROM curd_assign'
        await cassandraDb.execute(query).then(user =>{
            console.log('got all users')
            return res.status(200).json({
                message:"ALL Users Found Successfully",
                users:user.rows
            })
        }).catch(err=>{
           // console.log('Users Not Found')
            return res.status(500).json({
                message:"USERS_NOT_FOUND"
            })
        })
    })
}

//delete user
exports.deleteUser = (req,res) =>{
    return new Promise(async()=>{
        const id = req.params.id
       // console.log(id)
        let idPresent = `SELECT * FROM curd_assign WHERE id=${id}`;
        await cassandraDb.execute(idPresent).then(async (userId) => {
            if(userId.rowLength === 1){
                let query = `DELETE FROM curd_assign WHERE id=${id}`
                await cassandraDb.execute(query)
                console.log('user deleted successfully')
                return res.status(200).json({
                    message:"User Deleted successfully"
                })
            }else{
                console.log("ID_NOT_FOUND_IN_THE_DB")
                return res.status(500).json({
                    message: "ID_NOT_FOUND_IN_THE_DB"
                })
            }
        })
    })
}