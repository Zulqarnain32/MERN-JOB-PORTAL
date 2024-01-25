const express = require('express')
const router = express.Router()
const JobModel = require('../model/JobSchema')
const UserModel = require('../model/UserSchema')


//creating a job
router.post('/createjob', async (req,res) => {
    const {jobTitle,company,city,jobDate,jobType,jobStatus} = req.body;

    if (!jobTitle ||!company ||!city ||!jobDate ||!jobType ||!jobStatus){
        return res.json({message:"fill all form fields"})
    }
    const newJob = new JobModel(req.body)
    await newJob.save();
    res.json({message:"job created"})
})

//read job
router.get('/readjob', async (req,res) => {
    JobModel.find({})
    .then(jobs => res.json(jobs))
    .catch(err => res.json(err))

})
//delete the job
router.delete('/delete/:id', (req,res) => {
    const id = req.params.id;
    JobModel.findByIdAndDelete({_id:id})
    .then(jobs => res.json(jobs))
    .catch(err => res.json(err))
})

//update job 
//first get single job
router.get('/getJob/:id', (req, res) => {
    const id = req.params.id;
    console.log("id hai " + id); 
    JobModel.findById({_id: id})
        .then(result => {
            console.log(result); 
            res.json(result);
        })
        .catch(err => {
            console.log(err); 
            res.json(err);
        });
})
//second updata job
router.put('/editJob/:id', (req,res) => {
    const id = req.params.id;
    JobModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


// first step for saving applied jobs in user who are login
router.get('/saved-jobs/:id', (req,res) => {
    const id = req.params.id
    JobModel.findById(id)
    .then(result => {
       console.log("saving is working");
      return res.json({savedJobs:result.savedJobs})
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch recipe' });
    });
})


//fetch
router.put('/', async (req,res) => {
    // second step to save recipe inside the user
    const job = await JobModel.findById({_id: req.body.jobId})
    const user = await UserModel.findById({_id: req.body.userId})

    user.savedJobs.push(job)
    user.save();
  
    return res.json({savedJobs: user.savedJobs})
  })


  //? last step to save recipe inside the user
router.get('/user-jobs/:id', async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id); // Assuming `id` is the _id field of the user
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    const job = await JobModel.find({
      _id: { $in: user.savedJobs }
    });
    // console.log("This one  "+recipes);
    res.json(job);
  });


module.exports = router