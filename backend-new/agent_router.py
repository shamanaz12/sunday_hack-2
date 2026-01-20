import os
import json
from typing import Dict, Any, List
from pathlib import Path

class AgentRouter:
    """
    Routes chat messages to appropriate agents based on skills and message content
    """
    
    def __init__(self, skills_dir: str = "C:/Users/M.R Computers/Desktop/dec_2026/.claude/skills"):
        self.skills_dir = Path(skills_dir)
        self.agents = self._discover_agents()
    
    def _discover_agents(self) -> Dict[str, Dict[str, Any]]:
        """
        Discover all available agents and their skills from the skills directory
        """
        agents = {}
        
        for agent_dir in self.skills_dir.iterdir():
            if agent_dir.is_dir():
                agent_name = agent_dir.name
                # Look for a description or configuration file
                config_file = agent_dir / "config.json"
                readme_file = agent_dir / "README.md"
                
                description = f"Agent for {agent_name.replace('-', ' ').title()}"
                
                # Try to get description from config or README
                if config_file.exists():
                    try:
                        with open(config_file, 'r') as f:
                            config = json.load(f)
                            description = config.get('description', description)
                    except:
                        pass
                elif readme_file.exists():
                    try:
                        with open(readme_file, 'r') as f:
                            first_line = f.readline().strip()
                            if first_line:
                                description = first_line
                    except:
                        pass
                
                # Extract keywords from agent name and description
                keywords = self._extract_keywords(agent_name, description)
                
                agents[agent_name] = {
                    'name': agent_name,
                    'description': description,
                    'keywords': keywords,
                    'path': agent_dir
                }
        
        return agents
    
    def _extract_keywords(self, name: str, description: str) -> List[str]:
        """
        Extract relevant keywords from agent name and description
        """
        keywords = []
        
        # Add keywords from name
        name_parts = name.replace('-', ' ').replace('_', ' ').split()
        keywords.extend([part.lower() for part in name_parts])
        
        # Add keywords from description
        desc_words = description.lower().replace('-', ' ').replace('_', ' ').split()
        # Take the most meaningful words (not common stop words)
        common_words = {'for', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs'}
        
        desc_keywords = [word for word in desc_words if word not in common_words and len(word) > 2]
        keywords.extend(desc_keywords)
        
        return list(set(keywords))  # Remove duplicates
    
    def find_matching_agent(self, message: str) -> str:
        """
        Find the best matching agent for the given message
        """
        message_lower = message.lower()
        
        # Score each agent based on keyword matches
        scores = {}
        for agent_name, agent_info in self.agents.items():
            score = 0
            
            # Score based on keyword matches
            for keyword in agent_info['keywords']:
                if keyword in message_lower:
                    score += 1
            
            # Special scoring for certain agent types
            if 'task' in agent_name and ('task' in message_lower or 'todo' in message_lower):
                score += 2
            if 'create' in agent_name and ('create' in message_lower or 'add' in message_lower or 'new' in message_lower):
                score += 2
            if 'edit' in agent_name and ('edit' in message_lower or 'update' in message_lower or 'change' in message_lower):
                score += 2
            if 'delete' in agent_name and ('delete' in message_lower or 'remove' in message_lower):
                score += 2
            if 'filter' in agent_name and ('filter' in message_lower or 'show' in message_lower or 'list' in message_lower):
                score += 2
            if 'auth' in agent_name and ('login' in message_lower or 'sign' in message_lower or 'auth' in message_lower):
                score += 2
            
            scores[agent_name] = score
        
        # Return the agent with the highest score, or 'task-manager' as default
        best_agent = max(scores, key=scores.get) if scores else 'task-manager-agent'
        
        # If no agent has a good score, return the default task manager
        if scores.get(best_agent, 0) == 0:
            best_agent = 'task-manager-agent'
        
        return best_agent
    
    def execute_agent(self, agent_name: str, message: str, user_context: Dict[str, Any] = None) -> str:
        """
        Execute the specified agent with the given message
        """
        if agent_name not in self.agents:
            return f"Sorry, I couldn't find an agent to handle your request: '{message}'"
        
        # For now, we'll simulate agent responses based on the agent type
        # In a real implementation, you would call the actual agent code
        
        agent_info = self.agents[agent_name]
        
        # Simulate different agent behaviors based on name
        if 'task-create' in agent_name:
            return f"I'll help you create a task. Processing: '{message}'"
        elif 'task-edit' in agent_name:
            return f"I'll help you edit a task. Processing: '{message}'"
        elif 'task-delete' in agent_name:
            return f"I'll help you delete a task. Processing: '{message}'"
        elif 'task-filter' in agent_name:
            return f"I'll help you filter tasks. Processing: '{message}'"
        elif 'task-manager' in agent_name:
            return f"I'm managing your tasks. Processing: '{message}'"
        elif 'user-auth' in agent_name:
            return f"I'll help with authentication. Processing: '{message}'"
        elif 'dashboard' in agent_name:
            return f"I'll help with dashboard operations. Processing: '{message}'"
        else:
            return f"Agent {agent_name} received your request: '{message}'. This is a simulated response based on agent skills."