import Permission from '../models/permissionModel.js'




export const create = async (req, res) => {

    const { name, description } = req.body

    const existPremissions = Permission.find({ name })

    if (existPremissions) {
        return res.status(400).json({ status: false, message: 'Permission already exist' })
    }

    const permission = new Permission({
        name,
        description
    })

    await permission.save()
}


export const upadate = async (req, res) => {
    try {
        const { id, name } = req.body

        const updatepermission = await Permission.findByIdAndUpdate(id, name, { new: true })

        if (!updatepermission) {
            return res.status(400).json({ status: false, message: 'invaild permission' })
        }

        return res.status(200).json({ status: false, message: 'Permission updated successfully' })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'internal server error', error })

    }
}


export const deleteById = async(req, res) => {

    try {
        const id = req.prarams.id
        const deletePermission = await Permission.deleteById(id)

    } catch (error) {
        return res.status(500).json({status: false, } )
    }
   
}