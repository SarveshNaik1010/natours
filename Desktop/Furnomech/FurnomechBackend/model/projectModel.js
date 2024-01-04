const mongoose = require('mongoose');
const slugify = require('slugify');

const ProjectSchema = new mongoose.Schema({
    projectName: String,
    slug: String,
    clientName: String,
    imageCover: {
        type: String
    },
    photos: {
        type: Array
    },
    projectDescription: {
        type: String
    }
});

ProjectSchema.pre('save', function(next) {
    this.slug = slugify(this.projectName, { lower: true });
    console.log(this.slug);
    next();
})

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;