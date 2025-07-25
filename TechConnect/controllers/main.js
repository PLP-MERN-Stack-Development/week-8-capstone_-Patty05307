const User = require('../models/user');
const Sequelize = require('sequelize');

exports.getHome = async (req, res) => {
    res.render('layouts/home', {
        pageTitle: 'Home',
        message: 'Welcome to the Home Page!'
    });
};

exports.getEnroll = async (req, res) => {
    res.render('layouts/enrol', {
        pageTitle: 'Enroll'
    });
};

exports.postEnroll = async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            location,
            primarySkill,
            otherSkills,
            experienceYears,
            availability,
            about
        } = req.body;

        // Convert comma-separated otherSkills to an array (for PostgreSQL ARRAY type)
        const otherSkillsArray = otherSkills ? otherSkills.split(',').map(skill => skill.trim()) : [];

        // Create new user in the database
        const user = await User.create({
            name,
            phone,
            email,
            location,
            primarySkill,
            otherSkills: otherSkillsArray,
            experienceYears: experienceYears ? parseInt(experienceYears) : null,
            availability,
            about
        });

        res.redirect('/find')
        
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAll = async(req,res) =>{

    try{
          const technicians = await User.findAll();
            res.render('layouts/find', {
            pageTitle: 'Technicians',
            technicians
        });
    }

    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.queryUser = async (req, res) => {
    const { query } = req.query; // Use 'query' to match frontend fetch parameter
    try {
        const technicians = await User.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { name: { [Sequelize.Op.iLike]: `%${query}%` } },
                    { primarySkill: { [Sequelize.Op.iLike]: `%${query}%` } },
                    { location: { [Sequelize.Op.iLike]: `%${query}%` } }
                ]
            }
        });
        res.status(200).json(technicians);
    } catch (error) {
        console.error('Error querying technicians:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the technician by ID
        const result = await User.destroy({
            where: { id }
        });

        // Check if a technician was deleted
        if (result === 0) {
            return res.status(404).send('Technician not found');
        }

        // Fetch updated technician list
        const technicians = await User.findAll();

        // Render the find page with the updated list
         res.status(200).json(
            {
                status: "success"
            }
         )
    } catch (error) {
        console.error('Error deleting technician:', error);
        res.status(500).send('Internal Server Error');
    }
}
