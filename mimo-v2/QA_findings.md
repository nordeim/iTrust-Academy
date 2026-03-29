 I just completed a comprehensive UI/UX audit of that site. Here's what I found:                                                                                                                                                            
 
 ────────────────────────────────────────────────────────────────────────────────                                                                                                                                                           
 
 🔴 CRITICAL ISSUES                                                                                                                                                                                                                         
 
 ### 1. All CTAs Are Non-Functional                                                                                                                                                                                                         
 
 Every call-to-action button does nothing when clicked:                                                                                                                                                                                     
 - GET STARTED (header) — no navigation                                                                                                                                                                                                     
 - VIEW ALL COURSES — no navigation                                                                                                                                                                                                         
 - ENROLL NOW (4 instances) — no navigation                                                                                                                                                                                                 
 - VIEW FULL TRAINING CALENDAR — no navigation                                                                                                                                                                                              
 
 Impact: Zero conversion path. Users can't enroll or engage. The site is effectively a static mockup.                                                                                                                                       
 
 ### 2. Logo Text Duplication Bug                                                                                                                                                                                                           
 
 Renders as "iiTrust Academy" instead of "iTrust Academy" — the icon "i" and the text "i" in "iTrust" are both showing.                                                                                                                     
 
 ────────────────────────────────────────────────────────────────────────────────                                                                                                                                                           
 
 🟠 MAJOR ISSUES                                                                                                                                                                                                                            
 
 ### 3. No Accessibility Labels on Icons                                                                                                                                                                                                    
 
 40 SVG icons, zero have aria-label or role attributes. Screen reader users can't understand icon meanings. WCAG violation.                                                                                                                 
 
 ### 4. Zero <img> Tags                                                                                                                                                                                                                     
 
 All visuals are SVG-based with no image fallbacks or alt text. Potential SEO and accessibility impact.                                                                                                                                     
 
 ────────────────────────────────────────────────────────────────────────────────                                                                                                                                                           
 
 🟡 MODERATE ISSUES                                                                                                                                                                                                                         
 
 ### 5. Header CTA Font Too Small                                                                                                                                                                                                           
 
 GET STARTED button has 12px font — below the 14-16px recommended for touch targets.                                                                                                                                                        
 
 ### 6. All Navigation is Anchor-Based                                                                                                                                                                                                      
 
 COURSES, SOLUTIONS, ABOUT, CONTACT all scroll to sections on the same page. No deep-linkable content pages exist.                                                                                                                          
 
 ────────────────────────────────────────────────────────────────────────────────                                                                                                                                                           
 
 🟢 POSITIVES                                                                                                                                                                                                                               
 
 - Typography: DM Sans, clean hierarchy (H1: 72px, H2: 48px, H3: 18-20px)                                                                                                                                                                   
 - Color: Orange primary #F27A1A with good contrast                                                                                                                                                                                         
 - Structure: Hero, platform cards, training calendar, enterprise benefits, footer                                                                                                                                                          
 
 ────────────────────────────────────────────────────────────────────────────────                                                                                                                                                           
 
 📋 PRIORITY FIXES                                                                                                                                                                                                                          
 
 ┌──────────┬─────────────────────┬──────────────────────────────────┐                                                                                                                                                                      
 │ Priority │ Issue               │ Action                           │                                                                                                                                                                      
 ├──────────┼─────────────────────┼──────────────────────────────────┤                                                                                                                                                                      
 │ 1        │ Broken CTAs         │ Wire all buttons to routes/pages │                                                                                                                                                                      
 ├──────────┼─────────────────────┼──────────────────────────────────┤                                                                                                                                                                      
 │ 2        │ Logo duplication    │ Fix icon rendering               │                                                                                                                                                                      
 ├──────────┼─────────────────────┼──────────────────────────────────┤                                                                                                                                                                      
 │ 3        │ Missing a11y labels │ Add aria-label to all SVGs       │                                                                                                                                                                      
 ├──────────┼─────────────────────┼──────────────────────────────────┤                                                                                                                                                                      
 │ 4        │ Small button text   │ Increase header CTA to 14px+     │                                                                                                                                                                      
 └──────────┴─────────────────────┴──────────────────────────────────┘                                                                                                                                                                      
 
