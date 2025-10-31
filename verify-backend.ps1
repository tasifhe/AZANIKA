# Verify Render Backend Deployment

Write-Host "`n=== Checking Render Backend Health ===" -ForegroundColor Cyan

# Check health endpoint
Write-Host "`n1. Testing /health endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "https://azanika-backend.onrender.com/health" -Method Get
    Write-Host "✅ Health check passed!" -ForegroundColor Green
    Write-Host "Response: $($health | ConvertTo-Json)" -ForegroundColor White
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Check CORS test endpoint
Write-Host "`n2. Testing /cors-test endpoint..." -ForegroundColor Yellow
try {
    $cors = Invoke-RestMethod -Uri "https://azanika-backend.onrender.com/cors-test" -Method Get
    Write-Host "✅ CORS test passed!" -ForegroundColor Green
    Write-Host "Response: $($cors | ConvertTo-Json)" -ForegroundColor White
} catch {
    Write-Host "❌ CORS test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Check products endpoint
Write-Host "`n3. Testing /api/products endpoint..." -ForegroundColor Yellow
try {
    $products = Invoke-RestMethod -Uri "https://azanika-backend.onrender.com/api/products" -Method Get
    Write-Host "✅ Products endpoint working!" -ForegroundColor Green
    Write-Host "Found $($products.data.length) products" -ForegroundColor White
} catch {
    Write-Host "❌ Products endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Verification Complete ===" -ForegroundColor Cyan
Write-Host "`nIf you see errors above, make sure to:" -ForegroundColor Yellow
Write-Host "1. Add CLIENT_URL environment variable in Render" -ForegroundColor White
Write-Host "2. Click 'Save, rebuild, and deploy' button" -ForegroundColor White
Write-Host "3. Wait 3-5 minutes for deployment to complete" -ForegroundColor White
Write-Host "4. Run this script again to verify`n" -ForegroundColor White
