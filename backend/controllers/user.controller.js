import User from "../model/User.model.js";
import { analyzeInputService } from '../services/analyzeInput.service.js';
import { generateEvaluationService } from '../services/generateEvaluation.service.js';
import { evaluateAnswersService } from '../services/evaluateAnswers.service.js';
import { suggestProjectsService } from '../services/suggestProjects.service.js';
import { getHintsService } from '../services/getHints.service.js';
import { revealSolutionService } from '../services/revealSolution.service.js';

export async function getUserData(req,res) {
    try {
        const {userId}=req.body;
        if(!userId)
        {
            console.log("No user iD found");
            return res.status(400).json({success:false,message:"Unable to found the user"});
        }
        const user= await User.findById(userId);
        if(!user)
        {
            console.log("No user found");
            return res.status(400).json({success:false,message:"Unable to found the user"});
        }

        return res.status(200).json({success:true,userData:{
            name:user.name,
            isAccountVerified:user.isAccountVerified
        }})

    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false,message:"Unable to found the user"});
    }
}

export async function analyzeInputController(req, res) {
    try {
        const { concept, transcript, domains } = req.body;
        // console.log(concept, transcript, domains);
        
        if (!concept || !domains || !Array.isArray(domains) || domains.length === 0) {
            return res.status(400).json({ success: false, message: 'Concept and at least one domain are required.' });
        }
        // Call service to process input (summarize/extract keywords)
        const summary = await analyzeInputService({ concept, transcript, domains });
        console.log(summary);
        
        return res.status(200).json({ success: true, summary });
    } catch (error) {
        console.error('Error in analyzeInputController:', error);
        return res.status(500).json({ success: false, message: 'Failed to analyze input.' });
    }
}

export async function generateEvaluationController(req, res) {
    try {
        const { concept, domains, summary } = req.body;
        if (!concept || !domains || !summary) {
            return res.status(400).json({ success: false, message: 'Concept, domains, and summary are required.' });
        }
        const quiz = await generateEvaluationService({ concept, domains, summary });
        return res.status(200).json({ success: true, quiz });
    } catch (error) {
        console.error('Error in generateEvaluationController:', error);
        return res.status(500).json({ success: false, message: 'Failed to generate evaluation.' });
    }
}

export async function evaluateAnswersController(req, res) {
    try {
        const { quiz, answers } = req.body;
        if (!quiz || !answers) {
            return res.status(400).json({ success: false, message: 'Quiz and answers are required.' });
        }
        const level = await evaluateAnswersService({ quiz, answers });
        return res.status(200).json({ success: true, level });
    } catch (error) {
        console.error('Error in evaluateAnswersController:', error);
        return res.status(500).json({ success: false, message: 'Failed to evaluate answers.' });
    }
}

export async function suggestProjectsController(req, res) {
    try {
        const { level, domain, concept } = req.body;
        if (!level || !domain || !concept) {
            return res.status(400).json({ success: false, message: 'Level, domain, and concept are required.' });
        }
        const suggestions = await suggestProjectsService({ level, domain, concept });
        return res.status(200).json({ success: true, suggestions });
    } catch (error) {
        console.error('Error in suggestProjectsController:', error);
        return res.status(500).json({ success: false, message: 'Failed to suggest projects.' });
    }
}

export async function getHintsController(req, res) {
    try {
        const { concept, projectTitle } = req.body;
        if (!concept || !projectTitle) {
            return res.status(400).json({ success: false, message: 'Concept and project title are required.' });
        }
        const hints = await getHintsService({ concept, projectTitle });
        return res.status(200).json({ success: true, hints });
    } catch (error) {
        console.error('Error in getHintsController:', error);
        return res.status(500).json({ success: false, message: 'Failed to get hints.' });
    }
}

export async function revealSolutionController(req, res) {
    try {
        const { projectTitle, userLevel } = req.body;
        if (!projectTitle || !userLevel) {
            return res.status(400).json({ success: false, message: 'Project title and user level are required.' });
        }
        const solution = await revealSolutionService({ projectTitle, userLevel });
        return res.status(200).json({ success: true, solution });
    } catch (error) {
        console.error('Error in revealSolutionController:', error);
        return res.status(500).json({ success: false, message: 'Failed to reveal solution.' });
    }
}