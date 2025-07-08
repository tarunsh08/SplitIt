import { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Slide,
  Fade,
  Grow,
  Zoom,
  Chip,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  AccountBalance as BalanceIcon,
  Receipt as ReceiptIcon,
  TrendingUp as TrendingUpIcon,
  SwapHoriz as SwapIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  cyan,
  purple,
  indigo,
  teal,
  blue,
  pink,
  amber,
} from "@mui/material/colors";

const GlassPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(3),
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "24px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.15)",
    background: "rgba(255, 255, 255, 0.15)",
  },
}));

const FloatingCard = styled(Card)(({ theme }) => ({
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
  },
}));

const NeonButton = styled(Button)(({ theme }) => ({
  borderRadius: "16px",
  textTransform: "none",
  fontWeight: 600,
  padding: "12px 24px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
  },
}));

const GradientAvatar = styled(Avatar)(({ theme, color }) => ({
  background: `linear-gradient(135deg, ${color[400]}, ${color[600]})`,
  boxShadow: `0 4px 20px ${color[200]}`,
  width: 48,
  height: 48,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "& fieldset": {
      border: "none",
    },
    "&:hover": {
      background: "rgba(255, 255, 255, 0.15)",
    },
    "&.Mui-focused": {
      background: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: 500,
  },
  "& .MuiInputBase-input": {
    color: "white",
    fontWeight: 500,
  },
}));

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: cyan[400],
      light: cyan[300],
      dark: cyan[600],
    },
    secondary: {
      main: purple[400],
      light: purple[300],
      dark: purple[600],
    },
    background: {
      default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      paper: "rgba(255, 255, 255, 0.1)",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.95)",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

const BackgroundContainer = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)",
    zIndex: 1,
  },
});

const ContentContainer = styled(Container)({
  position: "relative",
  zIndex: 2,
  paddingTop: "2rem",
  paddingBottom: "2rem",
});

function Home() {
  const [participants, setParticipants] = useState(["Alice", "Bob", "Charlie"]);
  const [newParticipant, setNewParticipant] = useState("");
  const [expenses, setExpenses] = useState([
    { name: "Dinner", amount: 120, paidBy: "Alice" },
    { name: "Taxi", amount: 40, paidBy: "Bob" },
    { name: "Movie", amount: 30, paidBy: "Charlie" },
  ]);
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: 0,
    paidBy: "",
  });
  const [activeTab, setActiveTab] = useState("participants");
  const [showResults, setShowResults] = useState(false);
  const [settlements, setSettlements] = useState([]);

  const addParticipant = () => {
    if (newParticipant.trim() && !participants.includes(newParticipant)) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant("");
    }
  };

  const removeParticipant = (name) => {
    setParticipants(participants.filter((p) => p !== name));
  };

  const addExpense = () => {
    if (newExpense.name.trim() && newExpense.amount > 0 && newExpense.paidBy) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ name: "", amount: 0, paidBy: "" });
    }
  };

  const removeExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const calculateSettlements = () => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const perPerson = total / participants.length;

    const balances = {};
    participants.forEach((p) => (balances[p] = -perPerson));
    expenses.forEach((e) => (balances[e.paidBy] += e.amount));

    const newSettlements = [];
    const sorted = Object.entries(balances).sort((a, b) => a[1] - b[1]);

    while (sorted.length > 1) {
      const [debtor, debt] = sorted[0];
      const [creditor, credit] = sorted[sorted.length - 1];

      const amount = Math.min(-debt, credit);
      newSettlements.push({ from: debtor, to: creditor, amount });

      sorted[0][1] += amount;
      sorted[sorted.length - 1][1] -= amount;

      if (Math.abs(sorted[0][1]) < 0.01) sorted.shift();
      if (Math.abs(sorted[sorted.length - 1][1]) < 0.01) sorted.pop();
    }

    setSettlements(newSettlements);
    setShowResults(true);
  };

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPersonAmount =
    participants.length > 0 ? totalAmount / participants.length : 0;

  const participantColors = [cyan, purple, indigo, teal, pink, amber];

  return (
    <ThemeProvider theme={theme}>
      <BackgroundContainer>
        <ContentContainer maxWidth="md">
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  background:
                    "linear-gradient(45deg, #00f5ff, #ff00ff, #00ff88)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% 200%",
                  animation: "gradient 3s ease infinite",
                  "@keyframes gradient": {
                    "0%": {
                      backgroundPosition: "0% 50%",
                    },
                    "50%": {
                      backgroundPosition: "100% 50%",
                    },
                    "100%": {
                      backgroundPosition: "0% 50%",
                    },
                  },
                  textShadow: "0 0 30px rgba(0, 245, 255, 0.5)",
                  letterSpacing: "-2px",
                }}
              >
                💰 SplitWise
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                Split expenses effortlessly with friends
              </Typography>
            </Box>
          </Slide>

          {/* Stats Cards */}
          <Fade in={true} timeout={1000}>
            <Box display="flex" gap={2} mb={4} flexWrap="wrap">
              <FloatingCard sx={{ flex: 1, minWidth: 200 }}>
                <CardContent sx={{ textAlign: "center", py: 2 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                  >
                    <GradientAvatar color={cyan} size="small">
                      <PersonIcon />
                    </GradientAvatar>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {participants.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Participants
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </FloatingCard>

              <FloatingCard sx={{ flex: 1, minWidth: 200 }}>
                <CardContent sx={{ textAlign: "center", py: 2 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                  >
                    <GradientAvatar color={purple} size="small">
                      <ReceiptIcon />
                    </GradientAvatar>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {expenses.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Expenses
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </FloatingCard>

              <FloatingCard sx={{ flex: 1, minWidth: 200 }}>
                <CardContent sx={{ textAlign: "center", py: 2 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                  >
                    <GradientAvatar color={indigo} size="small">
                      <TrendingUpIcon />
                    </GradientAvatar>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        ${totalAmount.toFixed(0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </FloatingCard>
            </Box>
          </Fade>

          <Fade in={true} timeout={800}>
            <Box mb={3}>
              <FloatingCard>
                <Box display="flex" overflow="hidden">
                  <NeonButton
                    fullWidth
                    variant={
                      activeTab === "participants" ? "contained" : "text"
                    }
                    onClick={() => setActiveTab("participants")}
                    sx={{
                      borderRadius: 0,
                      py: 2,
                      background:
                        activeTab === "participants"
                          ? "linear-gradient(45deg, #00f5ff, #0080ff)"
                          : "transparent",
                      "&:hover": {
                        background:
                          activeTab === "participants"
                            ? "linear-gradient(45deg, #00d4ff, #0070ff)"
                            : "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                    startIcon={<PersonIcon />}
                  >
                    Participants
                  </NeonButton>
                  <NeonButton
                    fullWidth
                    variant={activeTab === "expenses" ? "contained" : "text"}
                    onClick={() => setActiveTab("expenses")}
                    sx={{
                      borderRadius: 0,
                      py: 2,
                      background:
                        activeTab === "expenses"
                          ? "linear-gradient(45deg, #ff00ff, #8000ff)"
                          : "transparent",
                      "&:hover": {
                        background:
                          activeTab === "expenses"
                            ? "linear-gradient(45deg, #e000e0, #7000e0)"
                            : "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                    startIcon={<ReceiptIcon />}
                  >
                    Expenses
                  </NeonButton>
                </Box>
              </FloatingCard>
            </Box>
          </Fade>

          {activeTab === "participants" && (
            <Grow in={activeTab === "participants"} timeout={500}>
              <GlassPaper elevation={0}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <PersonIcon /> Add Participants
                </Typography>
                <Box display="flex" gap={2} mb={3}>
                  <StyledTextField
                    fullWidth
                    label="Enter name"
                    variant="outlined"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addParticipant()}
                  />
                  <Zoom in={newParticipant.trim().length > 0}>
                    <NeonButton
                      variant="contained"
                      onClick={addParticipant}
                      startIcon={<AddIcon />}
                      sx={{
                        minWidth: "120px",
                        background: "linear-gradient(45deg, #00ff88, #00cc66)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #00ee77, #00bb55)",
                        },
                      }}
                    >
                      Add
                    </NeonButton>
                  </Zoom>
                </Box>

                <List
                  sx={{
                    "& .MuiListItem-root": { borderRadius: "16px", mb: 1 },
                  }}
                >
                  {participants.map((participant, index) => (
                    <Zoom
                      in={true}
                      key={participant}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <ListItem
                        sx={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: "rgba(255, 255, 255, 0.15)",
                            transform: "translateX(8px)",
                          },
                        }}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => removeParticipant(participant)}
                            sx={{
                              color: "#ff4081",
                              "&:hover": {
                                background: "rgba(255, 64, 129, 0.2)",
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <GradientAvatar
                            color={
                              participantColors[
                                index % participantColors.length
                              ]
                            }
                          >
                            <PersonIcon />
                          </GradientAvatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={participant}
                          primaryTypographyProps={{
                            fontWeight: 600,
                            fontSize: "1.1rem",
                          }}
                        />
                        <Chip
                          label={`$${perPersonAmount.toFixed(2)}`}
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #00f5ff, #0080ff)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </ListItem>
                    </Zoom>
                  ))}
                </List>
              </GlassPaper>
            </Grow>
          )}

          {activeTab === "expenses" && (
            <Grow in={activeTab === "expenses"} timeout={500}>
              <GlassPaper elevation={0}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <ReceiptIcon /> Add Expenses
                </Typography>
                <Stack spacing={3} mb={3}>
                  <StyledTextField
                    fullWidth
                    label="Expense name"
                    variant="outlined"
                    value={newExpense.name}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, name: e.target.value })
                    }
                  />
                  <StyledTextField
                    fullWidth
                    label="Amount"
                    type="number"
                    variant="outlined"
                    value={newExpense.amount || ""}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                    InputProps={{
                      startAdornment: (
                        <MoneyIcon
                          sx={{ color: "rgba(255, 255, 255, 0.7)", mr: 1 }}
                        />
                      ),
                    }}
                  />
                  {participants.length > 0 ? (
                    <StyledTextField
                      select
                      fullWidth
                      label="Paid by"
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                      value={newExpense.paidBy}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, paidBy: e.target.value })
                      }
                    >
                      <option value=""></option>
                      {participants.map((participant) => (
                        <option key={participant} value={participant}>
                          {participant}
                        </option>
                      ))}
                    </StyledTextField>
                  ) : (
                    <Typography
                      color="error"
                      sx={{ textAlign: "center", p: 2 }}
                    >
                      Please add participants first
                    </Typography>
                  )}
                  <Zoom
                    in={
                      newExpense.name.trim().length > 0 &&
                      newExpense.amount > 0 &&
                      newExpense.paidBy
                    }
                  >
                    <NeonButton
                      variant="contained"
                      onClick={addExpense}
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{
                        py: 1.5,
                        background: "linear-gradient(45deg, #ff00ff, #8000ff)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #e000e0, #7000e0)",
                        },
                      }}
                    >
                      Add Expense
                    </NeonButton>
                  </Zoom>
                </Stack>

                <List
                  sx={{
                    "& .MuiListItem-root": { borderRadius: "16px", mb: 1 },
                  }}
                >
                  {expenses.map((expense, index) => (
                    <Slide
                      direction="left"
                      in={true}
                      key={`${expense.name}-${index}`}
                    >
                      <ListItem
                        sx={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: "rgba(255, 255, 255, 0.15)",
                            transform: "translateX(-8px)",
                          },
                        }}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => removeExpense(index)}
                            sx={{
                              color: "#ff4081",
                              "&:hover": {
                                background: "rgba(255, 64, 129, 0.2)",
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <GradientAvatar color={purple}>
                            <MoneyIcon />
                          </GradientAvatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={expense.name}
                          secondary={`$${expense.amount.toFixed(2)} • Paid by ${
                            expense.paidBy
                          }`}
                          primaryTypographyProps={{
                            fontWeight: 600,
                            fontSize: "1.1rem",
                          }}
                          secondaryTypographyProps={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontWeight: 500,
                          }}
                        />
                      </ListItem>
                    </Slide>
                  ))}
                </List>
              </GlassPaper>
            </Grow>
          )}

          <Fade
            in={participants.length > 0 && expenses.length > 0}
            timeout={800}
          >
            <Box textAlign="center" my={4}>
              <NeonButton
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  background:
                    "linear-gradient(45deg, #00ff88, #00cc66, #0099ff)",
                  backgroundSize: "200% 200%",
                  animation: "gradient 3s ease infinite",
                  boxShadow: "0 8px 32px rgba(0, 255, 136, 0.3)",
                  "&:hover": {
                    boxShadow: "0 12px 48px rgba(0, 255, 136, 0.4)",
                  },
                }}
                onClick={calculateSettlements}
                startIcon={<BalanceIcon />}
              >
                Calculate Settlements
              </NeonButton>
            </Box>
          </Fade>

          {showResults && (
            <Zoom in={showResults}>
              <GlassPaper
                elevation={0}
                sx={{
                  background: "rgba(0, 255, 136, 0.1)",
                  borderColor: "rgba(0, 255, 136, 0.3)",
                  boxShadow: "0 8px 32px rgba(0, 255, 136, 0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  align="center"
                  sx={{
                    color: "#00ff88",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    fontWeight: 700,
                  }}
                >
                  <CheckIcon /> Settlement Results
                </Typography>
                <List
                  sx={{
                    "& .MuiListItem-root": { borderRadius: "16px", mb: 1 },
                  }}
                >
                  {settlements.map((settlement, index) => (
                    <Grow in={true} key={index} timeout={300 + index * 150}>
                      <ListItem
                        sx={{
                          background: "rgba(0, 255, 136, 0.1)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(0, 255, 136, 0.2)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: "rgba(0, 255, 136, 0.15)",
                            transform: "scale(1.02)",
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <GradientAvatar color={teal}>
                            <SwapIcon />
                          </GradientAvatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography component="span" fontWeight={600}>
                                {settlement.from}
                              </Typography>
                              <SwapIcon
                                fontSize="small"
                                sx={{ color: "#00ff88" }}
                              />
                              <Typography component="span" fontWeight={600}>
                                {settlement.to}
                              </Typography>
                            </Box>
                          }
                          secondary={`Amount: $${settlement.amount.toFixed(2)}`}
                          secondaryTypographyProps={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontWeight: 500,
                          }}
                        />
                        <Chip
                          label={`$${settlement.amount.toFixed(2)}`}
                          sx={{
                            background:
                              "linear-gradient(45deg, #00ff88, #00cc66)",
                            color: "white",
                            fontWeight: 700,
                          }}
                        />
                      </ListItem>
                    </Grow>
                  ))}
                </List>
                {settlements.length === 0 && (
                  <Box textAlign="center" py={4}>
                    <CheckIcon sx={{ fontSize: 48, color: "#00ff88", mb: 2 }} />
                    <Typography
                      variant="h6"
                      sx={{ color: "#00ff88", fontWeight: 600 }}
                    >
                      Perfect! Everyone's settled up! 🎉
                    </Typography>
                  </Box>
                )}
              </GlassPaper>
            </Zoom>
          )}

          <Fade in={true} timeout={1200}>
            <Box textAlign="center" mt={6}>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.8,
                  fontWeight: 500,
                  background: "linear-gradient(45deg, #00f5ff, #ff00ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ✨ Made with love using Material-UI ✨
              </Typography>
            </Box>
          </Fade>
        </ContentContainer>
      </BackgroundContainer>
    </ThemeProvider>
  );
}

export default Home;
