   
# 全局配置
port: 7890
socks-port: 7891
redir-port: 7892
mixed-port: 7893
tproxy-port: 7894
ipv6: false
allow-lan: true
unified-delay: true
tcp-concurrent: true
  
geodata-mode: false
geodata-loader: standard
geo-auto-update: true
geo-update-interval: 48
geox-url:
  geoip: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat"
  geosite: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat"
  mmdb: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb"
  asn: "https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
  
# 控制面板
external-controller: 0.0.0.0:9090
secret: ""
external-ui: ui
external-ui-url: "https://ghp.ci/https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip"

# 匹配进程 always/strict/off
find-process-mode: strict
global-client-fingerprint: chrome
keep-alive-idle: 600
keep-alive-interval: 30

# 策略组选择和fakeip缓存
profile:
  store-selected: true
  store-fake-ip: true
  
# 流量嗅探
sniffer:
  enable: true
  sniff:
    HTTP:
      ports: [80, 8080-8880]
      override-destination: true
    TLS:
      ports: [443, 8443]
    QUIC:
      ports: [443, 8443]
  force-domain:
    - +.v2ex.com
  skip-domain:
    - "Mijia Cloud"
    - "dlg.io.mi.com"
    - "+.push.apple.com"
    - "+.apple.com"
    
# 代理模式
tun:
  enable: true
  stack: mixed
  mtu: 9000
  dns-hijack:
    - "any:53"
    - "tcp://any:53"
  auto-route: true
  auto-redirect: true
  auto-detect-interface: true
  
# DNS模块
dns:
  enable: true
  listen: 0.0.0.0:1053
  ipv6: false
  respect-rules: true
  # 模式切换 redir-host / fake-ip
  enhanced-mode: fake-ip
  fake-ip-range: 28.0.0.1/8
  # 模式切换 whitelist/blacklist 
  # 黑名单模式表示如果匹配成功则不返回 Fake-IP, 白名单模式时只有匹配成功才返回 Fake-IP
  fake-ip-filter-mode: blacklist
  fake-ip-filter:
    - "+.lan"
    - "+.local"
    - geosite:private
    - geosite:cn
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  proxy-server-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver-policy:
    "rule-set:private_domain,cn_domain":
    - 223.5.5.5
    - 119.29.29.29
    "rule-set:geolocation-!cn":
      - "https://dns.cloudflare.com/dns-query"
      - "https://dns.google/dns-query"
 
# 锚点
pr: &pr {type: select, proxies: [🚀 节点选择, 🔯 香港故转, 🔯 日本故转, ♻️ 香港自动, ♻️ 日本自动, ♻️ 美国自动, ♻️ 自动选择, 🇭🇰 香港节点, 🇯🇵 日本节点, 🇺🇲 美国节点, 🌐 全部节点]}
# 策略组
proxy-groups:
  - {name: 🚀 节点选择, type: select, proxies: [🔯 香港故转, 🔯 日本故转, ♻️ 香港自动, ♻️ 日本自动, ♻️ 美国自动, ♻️ 自动选择, 🇭🇰 香港节点, 🇯🇵 日本节点, 🇺🇲 美国节点, 🌐 全部节点]}
  - {name: 📹 YouTube,!!merge <<: *pr}
  - {name: 🍀 Google,!!merge <<: *pr}
  - {name: 🤖 ChatGPT,!!merge <<: *pr}
  - {name: 👨🏿‍💻 GitHub,!!merge <<: *pr}
  - {name: 🐬 OneDrive,!!merge <<: *pr}
  - {name: 🪟 Microsoft,!!merge <<: *pr}
  - {name: 🎵 TikTok,!!merge <<: *pr}
  - {name: 📲 Telegram,!!merge <<: *pr}
  - {name: 🎥 NETFLIX,!!merge <<: *pr}
  - {name: ✈️ Speedtest,!!merge <<: *pr}
  - {name: 💶 PayPal,!!merge <<: *pr}
  - {name: 🍎 Apple, type: select, proxies: [DIRECT, 🚀 节点选择]}
  - {name: 🎯 全球直连, type: select, proxies: [DIRECT, 🚀 节点选择]}
  - {name: 🐟 漏网之鱼,!!merge <<: *pr}
  - {name: 🇭🇰 香港节点, type: select, include-all: true, filter: "(?i)港|hk|hongkong|hong kong"}
  - {name: 🇯🇵 日本节点, type: select, include-all: true, filter: "(?i)日|jp|japan"}
  - {name: 🇺🇲 美国节点, type: select, include-all: true, filter: "(?i)美|us|unitedstates|united states"}
  - {name: 🔯 香港故转, type: fallback, include-all: true, tolerance: 20, interval: 300, filter: "(?=.*(港|HK|(?i)Hong))^((?!(台|日|韩|新|深|美)).)*$"}
  - {name: 🔯 日本故转, type: fallback, include-all: true, tolerance: 20, interval: 300, filter: "(?=.*(日|JP|(?i)Japan))^((?!(港|台|韩|新|美)).)*$" }
  - {name: ♻️ 香港自动, type: url-test, include-all: true, tolerance: 20, interval: 300, filter: "(?=.*(港|HK|(?i)Hong))^((?!(台|日|韩|新|深|美)).)*$"}
  - {name: ♻️ 日本自动, type: url-test, include-all: true, tolerance: 20, interval: 300, filter: "(?=.*(日|JP|(?i)Japan))^((?!(港|台|韩|新|美)).)*$" }
  - {name: ♻️ 美国自动, type: url-test, include-all: true, tolerance: 20, interval: 300, filter: "(?=.*(美|US|(?i)States|America))^((?!(港|台|日|韩|新)).)*$"}
  - {name: ♻️ 自动选择, type: url-test, include-all: true, tolerance: 20, interval: 300, filter: "^((?!(直连)).)*$"}
  - {name: 🌐 全部节点, type: select, include-all: true}
rules:
  - RULE-SET,private_domain,DIRECT
  - RULE-SET,apple_domain,🍎 Apple
  - RULE-SET,proxylite,🚀 节点选择
  - RULE-SET,ai,🤖 ChatGPT
  - RULE-SET,github_domain,👨🏿‍💻 GitHub
  - RULE-SET,youtube_domain,📹 YouTube
  - RULE-SET,google_domain,🍀 Google
  - RULE-SET,onedrive_domain,🐬 OneDrive
  - RULE-SET,microsoft_domain,🪟 Microsoft
  - RULE-SET,tiktok_domain,🎵 TikTok
  - RULE-SET,speedtest_domain,✈️ Speedtest
  - RULE-SET,telegram_domain,📲 Telegram
  - RULE-SET,netflix_domain,🎥 NETFLIX
  - RULE-SET,paypal_domain,💶 PayPal
  - RULE-SET,geolocation-!cn,🚀 节点选择
  - RULE-SET,cn_domain,🎯 全球直连
  - RULE-SET,google_ip,🍀 Google,no-resolve
  - RULE-SET,netflix_ip,🎥 NETFLIX,no-resolve
  - RULE-SET,telegram_ip,📲 Telegram,no-resolve
  - RULE-SET,cn_ip,🎯 全球直连
  - MATCH,🐟 漏网之鱼
rule-anchor:
  ip: &ip {type: http, interval: 86400, behavior: ipcidr, format: mrs}
  domain: &domain {type: http, interval: 86400, behavior: domain, format: mrs}
  qcy: &qcy {type: http, interval: 86400, behavior: domain, format: text}
  class: &class {type: http, interval: 86400, behavior: classical, format: text}
rule-providers: 
  private_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs"}
  proxylite: {!!merge <<: *class, url: "https://raw.githubusercontent.com/qichiyuhub/rule/refs/heads/master/ProxyLite.list"}
  ai: {!!merge <<: *class, url: "https://raw.githubusercontent.com/qichiyuhub/rule/refs/heads/master/AI.list"}
  youtube_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs"}
  google_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.mrs"}
  github_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs"}
  telegram_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.mrs"}
  netflix_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/netflix.mrs"}
  paypal_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/paypal.mrs"}
  onedrive_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/onedrive.mrs"}
  microsoft_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft.mrs"}
  apple_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple-cn.mrs"}
  speedtest_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/ookla-speedtest.mrs"}
  tiktok_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/tiktok.mrs"}
  gfw_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/gfw.mrs"}
  geolocation-!cn: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/geolocation-!cn.mrs"}
  cn_domain: {!!merge <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs"}
  
  cn_ip: {!!merge <<: *ip, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.mrs"}
  google_ip: {!!merge <<: *ip, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/google.mrs"}
  telegram_ip: {!!merge <<: *ip, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/telegram.mrs"}
  netflix_ip: {!!merge <<: *ip, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/netflix.mrs"}
