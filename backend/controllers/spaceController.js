import Space from "../models/space.model.js"
import User from "../models/user.model.js"


export const createSpace = async (req, res) => {
    try {
        const { name } = req.body
        
        if(!name){
            return res.status(400).json({error: "Space name is required"})
        }

        const userId = req.user._id

        const newSpace = new Space({
            name,
            createdBy: userId,
            members: [userId]
        })

        await newSpace.save();

        res.status(200).json({
            message: "Space created successfully",
            space: newSpace
        })
    } catch (error) {
        console.error("Create space error:", error)
        res.status(500).json({
            message: "Failed to create space",
            error: error.message
        })
    }
}

export const getSpaces = async (req, res) => {
    try {
        const userId = req.user._id;

        const spaces = await Space.find({
            members: userId
        }).populate('members', 'name email');

        res.status(200).json({
            spaces,
        })
    } catch (error) {
        console.error('Get spaces error', error)
        res.status(500).json({
            error: 'Server error'
        })
    }
}

export const getSpaceById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Find space where the user is a member
        const space = await Space.findOne({
            _id: id,
            members: userId
        }).populate('members', 'name email')
          .populate('createdBy', 'name email');

        if (!space) {
            return res.status(404).json({
                error: 'Space not found or you do not have access to it'
            });
        }

        res.status(200).json({ space });
    } catch (error) {
        console.error('Get space by ID error:', error);
        res.status(500).json({
            error: 'Failed to fetch space',
            message: error.message
        });
    }
};

export const addMemberToSpace = async (req, res) => {
    try {
        const { email } = req.body;
        const { spaceId } = req.params;

        if(!email) {
            return res.status(400).json({
                error: "Email is required"
            })
        }

        const space = await Space.findById(spaceId);
        if(!space){
            return res.status(404).json({
                error: "Space not found"
            })
        }

        if(!space.members.includes(req.user._id)){
            return res.status(403).json({
                error: "User with this email not found"
            })
        }

        const userToAdd = await User.findOne({ email })
        if(!userToAdd){
            return res.status(404).json({
                error: "User with this email not found"
            })
        }

        if(space.members.includes(userToAdd._id)){
            return res.status(400).json({
                error: "User already a member of the space"
            })
        }

        space.members.push(userToAdd._id);
        await space.save();

        return res.status(200).json({
            message: "User added to space",
            member: userToAdd
        })
    } catch (err) {
        console.error("Adding member error:", err)
        res.status(500).json({
            error: "Server error"
        })
    }
}

export const addExpense = async (req, res) => {
    const {description, amount, paidBy, splitBetween} = req.body;
    const { id } = req.params;

    try {
        const space = await Space.findById(id);
        if(!space){
            return res.status(404).json({error: "Space not found"})
        }

        const expense = {
            description,
            amount,
            paidBy,
            splitBetween,
        };

        space.expenses.push(expense);
        await space.save();

        res.status(201).json({
            message: "Expense added", expense
        })
    } catch (err) {
        res.status(500).json({
            error: "Failed to add expense"
        })
    }
}