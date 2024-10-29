import express from 'express';
const app = express();

// Store for simulated timestamps
let simulatedTime = Date.now();

// Middleware to handle time simulation
app.use((req, res, next) => {
    // Check for time-shift header
    const timeShift = req.headers['x-time-shift'];
    if (timeShift) {
        const hours = parseInt(timeShift);
        simulatedTime += hours * 60 * 60 * 1000;
    }
    next();
});

app.get('/api/set-cookie', (req, res) => {
    const expirationDate = new Date(simulatedTime);
    expirationDate.setDate(expirationDate.getDate() + 7); // 7 days expiration

    res.cookie('pk_id', 'test-id-' + simulatedTime, {
        expires: expirationDate,
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });

    res.json({
        status: 'ok',
        currentTime: new Date(simulatedTime).toISOString(),
        cookieExpiration: expirationDate.toISOString()
    });
});

app.get('/api/time-travel', (req, res) => {
    const hours = parseInt(req.query.hours || '24');
    simulatedTime += hours * 60 * 60 * 1000;

    res.json({
        newTime: new Date(simulatedTime).toISOString(),
        hoursShifted: hours
    });
});

app.listen(3000, () => {
    console.log('Time simulation server running on port 3000');
});