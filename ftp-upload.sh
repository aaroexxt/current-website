#!/bin/bash

# Load environment variables
source .env

# Ensure necessary variables are set
if [[ -z $FTP_SERVER ]] || [[ -z $FTP_USER ]] || [[ -z $FTP_PASS ]] || [[ -z $TARGET_DIR ]]; then
    echo "(FTP-UPLOAD) FTP_SERVER, FTP_USER, FTP_PASS, and TARGET_DIR must be set in .env"
    exit 1
fi

FORCE=0  # Default is not to force

# Check for command line options
while getopts "f" opt; do
    case $opt in
        f)
            FORCE=1
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
    esac
done

# Check for changes on the remote
echo "(FTP-UPLOAD 1/2) Checking for changes on the remote (this may take a while)..."
TMP_OUTPUT=$(mktemp)

lftp <<EOF > "$TMP_OUTPUT" 2>&1
set net:max-retries 2;
set net:reconnect-interval-base 5;
set net:reconnect-interval-max 5;
set ssl:verify-certificate no;
open ftp://$FTP_USER:$FTP_PASS@$FTP_SERVER;
lcd build;
cd $TARGET_DIR;

# Upload everything outside the 'content' directory with --ignore-size
mirror --reverse --use-cache --dry-run --ignore-size \
--exclude ^content/ \
--exclude ^\.htaccess$ \
--exclude ^\.htaccess-old$ \
--exclude ^\.well-known$ \
--exclude ^cgi-bin$ \
--exclude ^desktop.ini$ \
--exclude ^sitemap.xml$

# Upload inside the 'content' directory only if file sizes are different
mirror --reverse --use-cache --dry-run --only-newer --ignore-time \
--directory content/ \
--exclude ^content/\.htaccess$ \
--exclude ^content/\.htaccess-old$ \
--exclude ^content/\.well-known$ \
--exclude ^content/cgi-bin$ \
--exclude ^content/desktop.ini$ \
--exclude ^content/sitemap.xml$
bye;
EOF


EXIT_STATUS=$?

# If there's an error during the dry run, exit
if [ $EXIT_STATUS -ne 0 ]; then
    cat "$TMP_OUTPUT"  # Display the error messages
    echo "(FTP-UPLOAD) Error encountered during FTP dry run. Exiting."
    rm "$TMP_OUTPUT"
    exit 1
fi

UPLOAD=0
# Check for changes or modifications
if grep -E "Transferring file|Modifying|chmod -f" "$TMP_OUTPUT" > /dev/null; then
    # If force mode, set UPLOAD flag to 1
    if [ $FORCE -eq 1 ]; then
        UPLOAD=1
    else
        # Prompt user for confirmation if changes or modifications detected
        echo "(FTP-UPLOAD) Build successful. There are changes or modifications to be made on the remote. Upload? y/n"
        read -r response
        
        # Check user's response
        case "$response" in
            [yY][eE][sS]|[yY])
                UPLOAD=1
                ;;
            *)
                echo "(FTP-UPLOAD) Upload cancelled."
                rm "$TMP_OUTPUT"
                exit 0
                ;;
        esac
    fi
else
    echo "(FTP-UPLOAD 2/2) Deploy success! No changes or modifications needed on the remote."
    rm "$TMP_OUTPUT"
    exit 0
fi

if [ $UPLOAD -eq 1 ]; then
    echo "(FTP-UPLOAD 2/2) Starting upload..."
    lftp <<EOF
set net:max-retries 2;
set net:reconnect-interval-base 5;
set net:reconnect-interval-max 5;
set ssl:verify-certificate no;
open ftp://$FTP_USER:$FTP_PASS@$FTP_SERVER;
lcd build;
cd $TARGET_DIR;

# Upload everything outside the 'content' directory if the file size is different OR the source file is newer
mirror --reverse --use-cache --verbose --parallel=3 --delete \
--exclude ^content/ \
--exclude ^\.htaccess$ \
--exclude ^\.htaccess-old$ \
--exclude ^\.well-known$ \
--exclude ^cgi-bin$ \
--exclude ^desktop.ini$ \
--exclude ^sitemap.xml$

# Upload inside the 'content' directory only if file sizes are different (ignoring metadata)
mirror --reverse --use-cache --verbose --only-newer --ignore-time --parallel=3 --delete \
--directory content/ \
--exclude ^content/\.htaccess$ \
--exclude ^content/\.htaccess-old$ \
--exclude ^content/\.well-known$ \
--exclude ^content/cgi-bin$ \
--exclude ^content/desktop.ini$ \
--exclude ^content/sitemap.xml$
bye;
EOF

echo "\n(FTP-UPLOAD 2/2) Deploy success! Files uploaded."

fi

rm "$TMP_OUTPUT"
