# Verify Render Backend Deployment

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  AZANIKA Backend Verification Script" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$backendUrl = "https://azanika-backend.onrender.com"
$frontendOrigin = "https://azanika.vercel.app"

# Test 1: Health Check
Write-Host "1. Testing /health endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$backendUrl/health" -Method Get -TimeoutSec 15
    Write-Host "   ✅ Health check PASSED" -ForegroundColor Green
    Write-Host "   Status: $($health.status)" -ForegroundColor White
    Write-Host "   Message: $($health.message)`n" -ForegroundColor White
} catch {
    Write-Host "   ❌ Health check FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   This means the backend is not responding at all!`n" -ForegroundColor Red
}

# Test 2: CORS Test Endpoint
Write-Host "2. Testing /cors-test endpoint..." -ForegroundColor Yellow
try {
    $cors = Invoke-RestMethod -Uri "$backendUrl/cors-test" -Method Get -TimeoutSec 15
    Write-Host "   ✅ CORS test PASSED" -ForegroundColor Green
    Write-Host "   Message: $($cors.message)`n" -ForegroundColor White
} catch {
    Write-Host "   ❌ CORS test FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)`n" -ForegroundColor Red
}

# Test 3: Products API (without CORS headers)
Write-Host "3. Testing /api/products endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$backendUrl/api/products" -Method Get -TimeoutSec 15
    $products = $response.Content | ConvertFrom-Json
    Write-Host "   ✅ Products API PASSED" -ForegroundColor Green
    Write-Host "   Found $($products.data.length) products" -ForegroundColor White
    Write-Host "   Status Code: $($response.StatusCode)`n" -ForegroundColor White
} catch {
    Write-Host "   ❌ Products API FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)`n" -ForegroundColor Red
}

# Test 4: CORS Headers Check (simulate browser request)
Write-Host "4. Testing CORS headers (simulating browser)..." -ForegroundColor Yellow
try {
    $headers = @{
        'Origin' = $frontendOrigin
        'Access-Control-Request-Method' = 'GET'
        'Access-Control-Request-Headers' = 'Content-Type'
    }
    $response = Invoke-WebRequest -Uri "$backendUrl/api/products" -Method OPTIONS -Headers $headers -TimeoutSec 15
    
    $allowOrigin = $response.Headers['Access-Control-Allow-Origin']
    $allowMethods = $response.Headers['Access-Control-Allow-Methods']
    
    if ($allowOrigin) {
        Write-Host "   ✅ CORS headers PRESENT" -ForegroundColor Green
        Write-Host "   Allow-Origin: $allowOrigin" -ForegroundColor White
        Write-Host "   Allow-Methods: $allowMethods" -ForegroundColor White
        Write-Host "   ✅ CORS is configured correctly!`n" -ForegroundColor Green
    } else {
        Write-Host "   ❌ CORS headers MISSING" -ForegroundColor Red
        Write-Host "   The backend is not sending CORS headers!`n" -ForegroundColor Red
    }
} catch {
    Write-Host "   ❌ CORS preflight FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   This is the root cause of your CORS error!`n" -ForegroundColor Red
}

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "           SUMMARY & NEXT STEPS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "If you see errors above:" -ForegroundColor Yellow
Write-Host "  1. Go to https://dashboard.render.com" -ForegroundColor White
Write-Host "  2. Click on 'azanika-backend' service" -ForegroundColor White
Write-Host "  3. Click 'Manual Deploy' → 'Deploy latest commit'" -ForegroundColor White
Write-Host "  4. Wait 3-5 minutes for deployment" -ForegroundColor White
Write-Host "  5. Run this script again: .\verify-backend.ps1`n" -ForegroundColor White

Write-Host "Environment Variables to Check in Render:" -ForegroundColor Yellow
Write-Host "  ✓ CLIENT_URL = $frontendOrigin" -ForegroundColor White
Write-Host "  ✓ DATABASE_URL = (your Supabase URL)" -ForegroundColor White
Write-Host "  ✓ PORT = 10000" -ForegroundColor White
Write-Host "  ✓ NODE_ENV = production`n" -ForegroundColor White
