# CORS Configuration Guide - iTrust Academy

## Overview

This guide documents CORS (Cross-Origin Resource Sharing) configuration for the iTrust Academy platform across different environments.

---

## Development Configuration

### Frontend (Vite)

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

### Backend (Django)

```python
# backend/academy/settings/development.py
CORS_ALLOW_ALL_ORIGINS = True  # Development only!
```

---

## Production Configuration

### Backend (Django)

```python
# backend/academy/settings/production.py

# CORS - Restrict to specific origins
CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = [
    "https://itrustacademy.com",
    "https://www.itrustacademy.com",
    "https://app.itrustacademy.com",
]

# Allow credentials (cookies, authorization headers)
CORS_ALLOW_CREDENTIALS = True

# Allowed methods
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

# Allowed headers
CORS_ALLOW_HEADERS = [
    "accept",
    "authorization",
    "content-type",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-request-id",
]

# Preflight cache duration
CORS_PREFLIGHT_MAX_AGE = 86400  # 24 hours
```

### Environment Variables

```env
# Production .env
CORS_ALLOWED_ORIGINS=https://itrustacademy.com,https://www.itrustacademy.com
```

---

## Security Considerations

### 1. Never use `CORS_ALLOW_ALL_ORIGINS = True` in production
- Allows any domain to make requests
- Enables CSRF attacks from malicious sites

### 2. Always use HTTPS in production
- HTTP origins are vulnerable to MITM attacks
- Use HSTS headers to enforce HTTPS

### 3. Restrict credentials
- Only allow credentials from trusted origins
- Use `CORS_ALLOW_CREDENTIALS = True` carefully

### 4. Limit allowed methods
- Only allow methods your API actually uses
- Remove unnecessary methods (e.g., DELETE if not used)

---

## Testing CORS

### Development Test

```bash
# Test API endpoint
curl -H "Origin: http://localhost:5174" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:8000/api/v1/courses/
```

### Production Test

```bash
# Verify CORS headers
curl -I -H "Origin: https://itrustacademy.com" \
     https://api.itrustacademy.com/api/v1/courses/

# Expected headers:
# Access-Control-Allow-Origin: https://itrustacademy.com
# Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
# Access-Control-Allow-Headers: accept, authorization, content-type, ...
# Access-Control-Allow-Credentials: true
```

---

## Deployment Checklist

- [ ] Set `CORS_ALLOW_ALL_ORIGINS = False` in production
- [ ] Add all frontend domains to `CORS_ALLOWED_ORIGINS`
- [ ] Verify HTTPS is enforced on all domains
- [ ] Test CORS headers with curl
- [ ] Monitor for CORS errors in production logs

---

## Troubleshooting

### Error: "No 'Access-Control-Allow-Origin' header"

**Cause:** Origin not in `CORS_ALLOWED_ORIGINS`

**Solution:** Add the origin to the allowed list:
```python
CORS_ALLOWED_ORIGINS = [
    "https://your-domain.com",
]
```

### Error: "Method not allowed"

**Cause:** Method not in `CORS_ALLOW_METHODS`

**Solution:** Add the method:
```python
CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",  # Add if needed
    "DELETE", # Add if needed
]
```

### Error: "Credential not supported"

**Cause:** `CORS_ALLOW_CREDENTIALS = False` or wildcard origin

**Solution:**
```python
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False  # Cannot use wildcard with credentials
```

---

**Document Version:** 1.0
**Last Updated:** March 31, 2026
**Status:** Production-ready
