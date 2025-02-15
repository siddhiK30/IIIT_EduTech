import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Modal,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import ScienceIcon from '@mui/icons-material/Science';
import ConstructionIcon from '@mui/icons-material/Construction';

const ConnectIQ = () => {
  const [openPhysics, setOpenPhysics] = useState(false);
  const [openChemistry, setOpenChemistry] = useState(false);
  const [physicsMessages, setPhysicsMessages] = useState([]);
  const [chemistryMessages, setChemistryMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const initialPhysicsMessages = [
    {
      text: "Can someone explain Newton's Third Law with an example?",
      timestamp: "10:30 AM",
      sender: "Vrinda"
    },
    {
      text: "Sure! Newton's Third Law states that for every action, there's an equal and opposite reaction. For example, when you're walking, you push the ground backward, and the ground pushes you forward with equal force.",
      timestamp: "10:32 AM",
      sender: "Harsh"
    },
    {
      text: "I'm still confused about the difference between mass and weight. Can anyone help?",
      timestamp: "10:35 AM",
      sender: "Siddhi"
    },
    {
      text: "Mass is the amount of matter in an object and remains constant everywhere. Weight is the force of gravity acting on the mass and changes depending on location. For example, your mass on Earth and Moon is same but weight is different!",
      timestamp: "10:37 AM",
      sender: "Veer"
    }
  ];

  const initialChemistryMessages = [
    {
      text: "What's the difference between physical and chemical changes?",
      timestamp: "11:15 AM",
      sender: "Siddhi"
    },
    {
      text: "In physical changes, no new substance is formed. Like ice melting to water. In chemical changes, new substances are formed with different properties. Like burning of paper!",
      timestamp: "11:17 AM",
      sender: "Vrinda"
    },
    {
      text: "Can someone explain the balancing of chemical equations?",
      timestamp: "11:20 AM",
      sender: "Veer"
    },
    {
      text: "Of course! Balancing equations means making sure there are equal numbers of atoms on both sides. Start with metals, then non-metals, and finally hydrogen and oxygen.",
      timestamp: "11:22 AM",
      sender: "Harsh"
    }
  ];

  useEffect(() => {
    setPhysicsMessages(initialPhysicsMessages);
    setChemistryMessages(initialChemistryMessages);
  }, []);

  const handlePhysicsOpen = () => setOpenPhysics(true);
  const handlePhysicsClose = () => setOpenPhysics(false);
  const handleChemistryOpen = () => setOpenChemistry(true);
  const handleChemistryClose = () => setOpenChemistry(false);

  const handleSendMessage = (chatType) => {
    if (currentMessage.trim() === '' && !selectedImage) return;

    const newMessage = {
      text: currentMessage,
      image: selectedImage,
      timestamp: new Date().toLocaleTimeString(),
      sender: 'user'
    };

    if (chatType === 'physics') {
      setPhysicsMessages([...physicsMessages, newMessage]);
    } else {
      setChemistryMessages([...chemistryMessages, newMessage]);
    }

    setCurrentMessage('');
    setSelectedImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const MessageBubble = ({ message }) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        {message.sender !== 'user' && (
          <Avatar
            sx={{
              bgcolor: message.sender === 'Harsh' ? '#e91e63' :
                      message.sender === 'Vrinda' ? '#9c27b0' :
                      message.sender === 'Veer' ? '#2196f3' :
                      '#4caf50'
            }}
          >
            {message.sender[0]}
          </Avatar>
        )}
        <Box>
          {message.sender !== 'user' && (
            <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
              {message.sender}
            </Typography>
          )}
          <Box
            sx={{
              maxWidth: '400px',
              backgroundColor: message.sender === 'user' ? '#1976d2' : '#f5f5f5',
              color: message.sender === 'user' ? 'white' : 'black',
              borderRadius: 2,
              p: 1.5,
              boxShadow: 1,
            }}
          >
            {message.image && (
              <img 
                src={message.image} 
                alt="Uploaded content"
                style={{ maxWidth: '100%', borderRadius: 4, marginBottom: 8 }}
              />
            )}
            <Typography>{message.text}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
              {message.timestamp}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const ChatModal = ({ open, handleClose, messages, chatType }) => (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="chat-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper 
        sx={{
          width: '80%',
          height: '80%',
          maxWidth: 800,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#ffffff',
          position: 'relative' // Added this
        }}
      >
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid #e0e0e0', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: '#ffffff'
        }}>
          <Typography variant="h6">
            {chatType === 'physics' ? 'Physics Chat Room' : 'Chemistry Chat Room'}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          p: 2, 
          bgcolor: '#f8f9fa',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}>
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
        </Box>

        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid #e0e0e0', 
          bgcolor: '#ffffff',
          position: 'sticky',
          bottom: 0,
          zIndex: 1
        }}>
          {selectedImage && (
            <Box sx={{ mb: 1 }}>
              <img 
                src={selectedImage} 
                alt="Selected" 
                style={{ maxHeight: 100, borderRadius: 4 }}
              />
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <input
              type="file"
              accept="image/*"
              id={`image-upload-${chatType}`} // Made ID unique for each chat
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <label htmlFor={`image-upload-${chatType}`}>
              <IconButton 
                component="span" 
                color="primary"
                sx={{ 
                  bgcolor: '#f5f5f5',
                  '&:hover': { bgcolor: '#e0e0e0' }
                }}
              >
                <ImageIcon />
              </IconButton>
            </label>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              size="small"
              autoComplete="off"
              InputProps={{
                sx: {
                  bgcolor: '#ffffff',
                  '&.Mui-focused': {
                    bgcolor: '#ffffff',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
            <IconButton 
              color="primary"
              onClick={() => handleSendMessage(chatType)}
              sx={{ 
                bgcolor: '#1976d2',
                color: '#ffffff',
                '&:hover': {
                  bgcolor: '#1565c0',
                },
                width: '40px',
                height: '40px'
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );

  const cardStyle = {
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
    }
  };

  return (
    <Box sx={{ p: 4, background: '#f8f9fa' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold', color: '#1a237e' }}>
        Connect IQ Chat Rooms
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle} onClick={handlePhysicsOpen}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <ConstructionIcon sx={{ fontSize: 80, color: '#1976d2', mb: 3 }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Physics Chat Room
              </Typography>
              <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                Discuss physics problems and concepts
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: '#666' }}>
                Join discussions on mechanics, energy, waves, and more
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Chip label="Mechanics" color="primary" />
                <Chip label="Energy" color="secondary" />
                <Chip label="Waves" color="success" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={cardStyle} onClick={handleChemistryOpen}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <ScienceIcon sx={{ fontSize: 80, color: '#9c27b0', mb: 3 }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Chemistry Chat Room
              </Typography>
              <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                Discuss chemistry problems and concepts
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: '#666' }}>
                Explore chemical reactions, periodic table, and more
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Chip label="Reactions" color="primary" />
                <Chip label="Periodic Table" color="secondary" />
                <Chip label="Solutions" color="success" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ChatModal
        open={openPhysics}
        handleClose={handlePhysicsClose}
        messages={physicsMessages}
        chatType="physics"
      />

      <ChatModal
        open={openChemistry}
        handleClose={handleChemistryClose}
        messages={chemistryMessages}
        chatType="chemistry"
      />
    </Box>
  );
};

export default ConnectIQ;