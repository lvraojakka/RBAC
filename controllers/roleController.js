import Role from '../models/roleModel.js'
import Permission from '../models/permissionModel.js'




const validatePermissions = async (permissions) => {
    try {
      // Convert to ObjectId if needed
      const permissionIds = permissions.map(id => new mongoose.Types.ObjectId(id));
  
      // Query DB for matching permissions
      const existing = await Permission.find({
        _id: { $in: permissionIds }
      });
  
      // Check if all provided IDs exist
      if (existing.length !== permissions.length) {
        const existingIds = existing.map(p => p._id.toString());
        const missing = permissions.filter(id => !existingIds.includes(id));
        return {
          status: false,
          message: 'Some permissions are invalid',
          missing
        };
      }
  
      return {
        status: true,
        message: 'All permissions are valid',
        data: existing
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error checking permissions',
        error: error.message
      };
    }
  };
  

export const create = async (req, res) => {

    try {
        const { name, permissions } = req.body
        const userId = req.user
    if(name || permissions) {
        return res.status(400).json({ status: false, message: 'missing requird perameters'})
    }

    const existRole = await Role.find({name, createdBy:userId})

    if (existRole) {
        return res.status(400).json({ status: false, message: 'Role already exists'})
    }

    const validatePermission = await validatePermissions(permissions);
    if (!validatePermission.status) {
      return res.status(400).json({
        status: false,
        message: 'Invalid permissions',
        missing: validatePermission.missing,
      });
    }
    
    const role = new Role({
        name,
        permissions,
        createdBy:userId,
    })

    await role.save()
    return res.status(201).json({ status: true, message: 'Role created successfully'})

    } catch (error) {
        return res.status(500).json({ status: false, message: 'internal server error'})
    }
    
}



export const update = async (req, res) => {

    try {

        const { name, permissions } = req.body
        const userId = req.user

    if(name || permissions) {
        return res.status(400).json({ status: false, message: 'missing requird perameters'})
    }

    const existRole = await Role.find({ name, createdBy:userId })

    if (!existRole) {
        return res.status(400).json({ status: false, message: 'Role not found'})
    }


   
    return res.status(201).json({ status: true, message: 'Role created successfully'})

    } catch (error) {
        return res.status(500).json({ status: false, message: 'internal server error'})
    }
    
}